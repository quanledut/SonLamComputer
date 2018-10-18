const mongoose = require( 'mongoose' );

const User = mongoose.model('User');
const Role = mongoose.model('Role');
const Policy = mongoose.model('Policy');
const DeviceType = mongoose.model('DeviceType');
const Device = mongoose.model('Device');
const ComputerType = mongoose.model('ComputerType');
const ComputerName = mongoose.model('ComputerName');
const ServiceType = mongoose.model('ServiceType');

const DATA = {
    DeviceType: [
        "Laptop",
        "Bàn Phím",
        "Chuột",
        "Tai Nghe",
        "Pin",
        "Màn Hình",
    ],
    ServiceType: [
        "Sữa Chữa",
        "Thay Thế"
    ],
    ComputerType: [
        "Dell",
        "HP",
        "Asus",
        "Acer",
        "Lenovo",
        "Macbook"
    ],
    ComputerName: {
        Dell: [
            "Dell Inpiration 3365",
            "Dell Inpiration 3567",
            "Dell Inpiration 5570",
            "Dell Inpiration 5370",
            "Dell Inpiration 7373",
            "Dell Inpiration 3565",
            "Dell Inpiration 5567",
            "Dell Inpiration 7759",
            "Dell Vostro 3758",
            "Dell Vostro 3468",
            "Dell Vostro 3568",
        ],
        HP: [
            "HP Pavilion 15",
            "HP Pavilion x360",
            "HP 14",
            "HP 15",
            "HP Envy 13",
            "HP Envy 17",
            "HP Envy x360",
            "HP Spectre x2",
            "HP Spectre",
            "HP Spectre Folio 13",
            "HP Probook 450 G1",
            "HP Probook 450 G2",
            "HP EliteBook 1040",
            "HP EliteBook 840"
        ],
        Asus: [
            "Asus ROG Strix GL503",
            "Asus VivoBook Max",
            "Asus VivoBook",
            "Asus VivoBook S15",
            "Asus TUF Gaming",
            "Asus ROG GL553VD",
            "Asus VivoBook 15",
            "Asus VivoBook 14",
        ],
        Acer: [
            "Acer Aspire ES1",
            "Acer Nitro 5",
            "Acer Aspire 5",
            "Acer Predator Helios",
        ],
        Lenovo: [
            "Lenovo Ideapad 320",
            "Lenovo Ideapad 120s",
            "Lenovo Thinkpad X1 Carbon",
            "Lenovo Yoga 300"
        ],
        Macbook: [
            "Macbook Air 2016",
            "Macbook Air 2015",
            "Macbook Air 2017",
            "Macbook Pro 2016",
            "Macbook Pro 2015",
            "Macbook Pro 2017",
            "Macbook 12",
            "Macbook 2017",
            "Macbook 2016"
        ]
    }
}

const create_data = async () => {
    let admin;
    try {
        admin = await User.findOne({
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
    let user = new User();
    let result;

	user.username = 'user';
	user.email = 'user@user.com';
    user.fullname = 'user';
    user.roles = [roleId];
    password = user.setPassword('user');
    result = await user.save();

    return result
}
const create_admin = async (roleId) => {
    let user = new User();
    let result;

	user.username = 'thanhson';
	user.email = 'son@gmail.com';
    user.fullname = 'Lê Phước Thành Sơn';
    user.roles = [roleId];
    password = user.setPassword('thanhson');
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

const create_other_data = async () => {
    let devices = await Device.find({})
    console.log(devices.length)
    if (devices.length > 0) return

    await DeviceType.remove({})
    await Device.remove({})
    await ComputerType.remove({})
    await ComputerName.remove({})
    await ServiceType.remove({})

    let computers = await _createComputer()
    let deviceTypes = await _createDeviceType()
    let serviceTypes = await _createServiceType() 

    return await _createDevice(
        computers,
        deviceTypes,
        serviceTypes
    )
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

const _createDeviceType = async () => {
    let deviceTypes = [];

    for (let i = 0; i < DATA.DeviceType.length; i++) {
        const result = await DeviceType.create({
            name: DATA.DeviceType[i]
        })
        deviceTypes.push(result)
    }
    
    return deviceTypes

}

const _createComputer = async () => {
    let computers = []

    for (let i = 0; i < DATA.ComputerType.length; i++) {
        let computerType = DATA.ComputerType[i];
        const t = await ComputerType.create({
            name: computerType
        })

        let computerNames = DATA.ComputerName[computerType]

        for (let j = 0; j < computerNames.length; j++) {
            let computerName = computerNames[j]

            let result = await ComputerName.create({
                type: t._id,
                name: computerName
            })

            computers.push(result)
        }

    }

    return computers
}

const _createDevice = async (computers, deviceTypes, serviceTypes ) => {
    for (let i = 0; i < serviceTypes.length; i++) {
        let serviceType = serviceTypes[i]
        for (let j = 0; j < computers.length; j++) {
            let computer = computers[j]
            for (let e = 0; e < deviceTypes.length; e++) {
                let deviceType = deviceTypes[e]
                if (serviceType.name == "Thay Thế" && deviceType == "Máy Tính") continnue
                Device.create({
                    computerName: computer._id,
                    deviceType: deviceType._id,
                    serviceType: serviceType._id,
                    amount: 100,
                    price: 0,
                    guaranteeDuration: 30
                })
            }
        }
    }
}

create_data();
create_other_data()
    .then(() => console.log("done"))
    .catch((err) => console.log(err))