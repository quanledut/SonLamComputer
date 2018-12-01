export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },

    //Quản lý tài khoản
    {
      name: 'Quản lý tài khoản',
      url: '/usermanager',
      icon: 'cui-user',
    },
    //-----------------------------------------------------
    //Quản lý phân quyền
    {
      name: 'Quản lý quyền',
      url: '/roles',
      icon: 'fa fa-address-card',
    },
    //-----------------------------------------------------
    //Quản lý khách hàng
    {
      name: 'Quản lý khách hàng',
      url: '/customers',
      icon: 'fa fa-tasks',
    },
    //-----------------------------------------------------
    //Quản lý thiết bị
    {
      name: 'Quản lý thiết bị',
      url: '/devices',
      icon: 'fa fa-laptop',
      children: [
        {
          name: 'Máy tính',
          url: '/devices/computerName',
          icon: 'fa fa-desktop',
        },
        {
          name: 'Loại máy tính',
          url: '/devices/computerType',
          icon: 'icon-star',
        },
        {
          name: 'Thiết bị',
          url: '/devices/device',
          icon: 'fa fa-microchip',
        },
        {
          name: 'Loại thiết bị',
          url: '/devices/deviceType',
          icon: 'icon-star',
        },
        {
          name: 'Linh Kiện',
          url: '/devices/accessory',
          icon: 'fa fa-microchip',
        },
        {
          name: 'Loại Linh Kiện',
          url: '/devices/accessoryType',
          icon: 'icon-star',
        },
      ],
    },
    //-----------------------------------------------------
    //Quản lý giao dịch
    // {
    //   name: 'Quản lý giao dịch',
    //   url: '/pages',
    //   icon: 'fa fa-handshake-o',
    // },
    //-----------------------------------------------------
    //Quản lý dịch vụ
    {
      name: 'Quản lý sửa chữa',
      url: '/services/service',
      icon: 'fa fa-recycle',
      // children: [
      //   {
      //     name: 'Dịch vụ',
      //     url: '/services/service',
      //     icon: 'fa fa-microchip',
      //   },
      //   {
      //     name: 'Loại dịch vụ',
      //     url: '/services/serviceType',
      //     icon: 'fa fa-code',
      //   },
        // {
        //   name: 'Lịch sử',
        //   url: '/pages',
        //   icon: 'icon-star',
        // },
      //],
    },

    //-----------------------------------------------------
    //Quản lý mua bán
    {
      name: 'Quản lý mua bán',
      url: '/saleorders',
      icon: 'fa fa-cart-plus',
    },

    //-----------------------------------------------------
    //Quản lý giao dịch
    {
      name: 'Thanh toán',
      url: '/payments',
      icon: 'fa fa-handshake-o',
    },

    //-----------------------------------------------------
    //Quản lý giao dịch
    {
      name: 'Thông tin cá nhân',
      url: '/viewcustomers',
      icon: 'fa fa-address-card',
    },

    //-----------------------------------------------------
    //Quản lý thiết bị đã sửa chữa
    // {
    //   name: 'Quản lý thiết bị đã sửa chữa',
    //   url: '/pages',
    //   icon: 'fa fa-recycle',
    // },
    //-----------------------------------------------------
    //Quản lý kho thiết bị
    // {
    //   name: 'Quản lý kho thiết bị',
    //   url: '/pages',
    //   icon: 'fa fa-tasks',
    // },
    //-----------------------------------------------------
    //Báo cáo thống kê
    // {
    //   name: 'Báo cáo thống kê',
    //   url: '/pages',
    //   icon: 'fa fa-building',
    //   children: [
    //     {
    //       name: 'Login',
    //       url: '/login',
    //       icon: 'icon-star',
    //     },
    //     {
    //       name: 'Register',
    //       url: '/register',
    //       icon: 'icon-star',
    //     },
    //     {
    //       name: 'Error 404',
    //       url: '/404',
    //       icon: 'icon-star',
    //     },
    //     {
    //       name: 'Error 500',
    //       url: '/500',
    //       icon: 'icon-star',
    //     },
    //   ],
    // },
    //-----------------------------------------------------
  ],
};
