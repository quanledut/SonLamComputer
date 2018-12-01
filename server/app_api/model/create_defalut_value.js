const mongoose = require( 'mongoose' );
const fs = require('fs');
const path = require('path');

const UserInfo = mongoose.model('UserInfo');
const LoginInfo = mongoose.model('LoginInfo');
const Role = mongoose.model('Role');
const Policy = mongoose.model('Policy');
const DeviceType = mongoose.model('DeviceType');
const Device = mongoose.model('Device');
const AccessoryType = mongoose.model('AccessoryType');
const Accessory = mongoose.model('Accessory');
const ComputerType = mongoose.model('ComputerType');
const ComputerName = mongoose.model('ComputerName');
const ServiceType = mongoose.model('ServiceType');

const DATA = {
    ServiceType: ["Sữa chữa", "Thay Thế", "Mua Bán"]
}

const FAKE_IMAGE_NAME = {
    "Bàn Phím": "keyboard",
    "Màn Hình": "monitor",
    "Pin": "battery",

}

const createRegexComputerName = (computerType) => {
    const numWords = computerType.split(" ").length;
    const base = "[^\\s]+"
    let result = "" + base;
    for (let i = 1; i < numWords + 2; i++) {
        result += "\\s+"
        result += base;
    }
    return result;
}

const read_json = () => {
    const dir = fs.readdirSync(path.resolve('default_data'));
    const data = {}
    for (let i = 0; i < dir.length; i++) {
        let content = fs.readFileSync(path.resolve('default_data', dir[i]), {
            encoding: 'utf-8'
        })
        content = JSON.parse(content);

        const type = dir[i].split('.')[0];
        // console.log(type, content)
        switch (type) {
            case 'hdd': 
                data['HDD'] = content;
                break;
            case 'mouse': 
                data['Chuột'] = content;
                break;
            case 'keyboard':
                data['Bàn Phím'] = content;
                break;
            case 'ssd':
                data['SSD'] = content
                break;
            case 'laps':
                const lapTypes = {};

                for (let i = 0; i < content.length; i++) {
                    const lap = content[i]
                    let lapName = new RegExp(createRegexComputerName(lap.lap_type)).exec(lap.name)
                    if (lapName == null) continue

                    lapName = lapName[0]
                        .replace(/\s+/g, " ")
                        .replace(/\s*[-(].*/g, "").toUpperCase()
                    // console.log(lapName)
                    if (!lapTypes.hasOwnProperty(lap.lap_type)) {
                        lapTypes[lap.lap_type] = {};
                    }

                    if (!lapTypes[lap.lap_type].hasOwnProperty(lapName)) {
                        lapTypes[lap.lap_type][lapName] = []
                    }

                    lapTypes[lap.lap_type][lapName].push(content)
                    // console.log(lapName)
                }

                data["LapTop"] = lapTypes;

                break;
        }
    }

    return data;
}

const create_data = async () => {
    let admin;
    try {
        admin = await LoginInfo.findOne({
            'username': 'thanhson'
        })
    } catch(err) {
        console.log(err);
    }

    if (!admin) {
        console.log("Crreating data");
        try {
            const roleAdmin = await create_role_admin();
            const roleUser = await create_role_user();

            try {
                admin = await create_admin(roleAdmin.id);
                user = await create_user(roleUser.id);  
                
                await create_policies(roleAdmin.id, true);
                await create_policies(roleUser.id, false);
            } catch(err) {
                console.log("Error in creating admin");
            }
        } catch(err) {
            console.log("Error in create roles");
            console.log(err);
        }
    }
}


const create_role_admin = async () => {
    let role = new Role()
    let result
    role.name = 'root_admin'

    result = await role.save();

    return result;
}

const create_role_user = async () => {
    let role = new Role()
    let result
    role.name = 'user'
    result = await role.save();

    return result;
}

const create_user = async (roleId) => {
    let loginInfo = new LoginInfo();
    loginInfo.username = 'user';
    loginInfo.setPassword('user');
    let resultCreateLogin = await loginInfo.save();

    let user = new UserInfo();
    let result;

    user.code = "KH 1";
	user.email = 'user@gmail.com';
    user.fullname = 'User';
    user.roles = [roleId];
    user.gender = 'nam';
    user.address = 'danang';
    user.phone = '01233123457';
    user.loginInfo = resultCreateLogin._id;

    result = await user.save();

    return result
}

const create_admin = async (roleId) => {
    let loginInfo = new LoginInfo();
    loginInfo.username = 'thanhson';
    loginInfo.setPassword('thanhson');
    let resultCreateLogin = await loginInfo.save();

    let user = new UserInfo();
    let result;

	user.email = 'son@gmail.com';
    user.fullname = 'Lê Phước Thành Sơn';
    user.gender = 'nam';
    user.address = 'danang';
    user.phone = '01233123456';
    user.roles = [roleId];
    user.loginInfo = resultCreateLogin._id;

    result = await user.save();

    return result
}

const create_policies = async (roleId, isRoot) => {
    Object.keys(mongoose.connection.models).forEach(async (collection) => {
        try {
            await create_policy(roleId, collection, isRoot)
        } catch(err) {
            console.log("Error in creating policy for table", collection);
            console.log(err)
        }
    })    
}

const create_policy = async (roleId, collectionName, isRoot) => {
    if (!isRoot) return;
    if (!collectionName) return null;
    let policy = new Policy();
    policy.roleId = roleId;
    policy.collectionName = collectionName;
    policy.permission = 15
    await policy.save();

}

const create_other_data = async (data) => {
    let count = await Device.count({})
    console.log(count)

    if (count) return;

    const accessoryData = {
        "Bàn Phím": [],
        "Màn Hình": [],
        "Pin": [],
    }

    await DeviceType.remove({})
    await Device.remove({})
    await ComputerType.remove({})
    await ComputerName.remove({})
    await ServiceType.remove({})
    await Accessory.remove({})
    await AccessoryType.remove({})

    let computers = await _createComputer(data)
    let deviceTypes = await _createDeviceType(data)
    let serviceTypes = await _createServiceType(data)
    let accessoryType = await _createAccessoryType(accessoryData)
    
    await _createDevice(data,deviceTypes);
    await _createAccessory(accessoryData, computers, accessoryType)

    return 
}

const _createServiceType = async () => {
    let serviceTypes = [];

    for (let i = 0; i < DATA.ServiceType.length; i++) {
        const result = await ServiceType.create({
            name: DATA.ServiceType[i]
        })

        serviceTypes.push(result)
    }

    return serviceTypes
}

const _createDeviceType = async (data) => {
    let deviceTypes = [];

    for (let type in data) {
        const result = await DeviceType.create({
            name: type
        });
        deviceTypes.push(result)
    }
    
    return deviceTypes

}

const _createAccessoryType = async (data) => {
    let accessoryTypes = [];

    for (let type in data) {
        const result = await AccessoryType.create({
            name: type
        });
        accessoryTypes.push(result)
    }
    
    return accessoryTypes

}

const _createComputer = async (data) => {
    let computers = []
    let computerTypes = data['LapTop'];
    for (let type in computerTypes) {
        const t = await ComputerType.create({
            name: type
        });

        for (let name in computerTypes[type]) {
            const computerName = await ComputerName.create({
                type: t._id,
                name: name
            });
            computers.push(computerName)
        }
    }

    return computers;
}

const _createDevice = async (data, deviceTypes) => {
    for (let type in data) {
        const deviceTypeId = deviceTypes.filter(i => i.name == type)[0].id
        for (let i = 0; i < data[type].length; i++) {
            const deviceData = data[type][i];
            await Device.create({
                name: deviceData.name,
                type: deviceTypeId,
                description: deviceData.spec,
                image_url: deviceData.images[0].path.replace("full", "/images"),
                amount: 100,
                price: deviceData.price,
                guaranteeDuration: 0
            })
        }
    }
}

const _createAccessory = async (data, computerName, accessoryType) => {
    for (let type in data) {
        const accessoryTypeId = accessoryType.filter(i => i.name == type)[0].id
        for (let i = 0; i < computerName.length; i++) {
            await Accessory.create({
                computerName: computerName[i]._id,
                type: accessoryTypeId,
                description: "",
                image_url: "/images/accessory_" + FAKE_IMAGE_NAME[type] + ".jpg",
                amount: 100,
                price: 0,
                guaranteeDuration: 0
            })
        }
    }

}

// create_data();
// create_other_data()
//     .then(() => console.log("done"))
//     .catch((err) => console.log(err))

const data = read_json()

create_data();
create_other_data(data)
    .then(() => console.log("done"))
    .catch((err) => console.log(err))

