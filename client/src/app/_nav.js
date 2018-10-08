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
      // children: [
      //   {
      //     name: 'Login',
      //     url: '/login',
      //     icon: 'icon-star',
      //   },
      //   {
      //     name: 'Register',
      //     url: '/register',
      //     icon: 'icon-star',
      //   },
      //   {
      //     name: 'Error 404',
      //     url: '/404',
      //     icon: 'icon-star',
      //   },
      //   {
      //     name: 'Error 500',
      //     url: '/500',
      //     icon: 'icon-star',
      //   },
      // ],
    },
    //-----------------------------------------------------
    //Quản lý phân quyền
    {
      name: 'Quản lý quyền',
      url: '/roles',
      icon: 'fa fa-address-card',
    },
    //-----------------------------------------------------
    //Quản lý giao dịch
    {
      name: 'Quản lý giao dịch',
      url: '/pages',
      icon: 'fa fa-handshake-o',
    },
    //-----------------------------------------------------
    //Quản lý dịch vụ
    {
      name: 'Quản lý dịch vụ',
      url: '/services',
      icon: 'fa fa-exchange',
    },
    //-----------------------------------------------------
    //Quản lý thiết bị đã sửa chữa
    {
      name: 'Quản lý thiết bị đã sửa chữa',
      url: '/pages',
      icon: 'fa fa-recycle',
    },
    //-----------------------------------------------------
    //Quản lý kho thiết bị
    {
      name: 'Quản lý kho thiết bị',
      url: '/pages',
      icon: 'fa fa-tasks',
    },
    //-----------------------------------------------------
    //Báo cáo thống kê
    {
      name: 'Báo cáo thống kê',
      url: '/pages',
      icon: 'fa fa-building',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star',
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star',
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-star',
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star',
        },
      ],
    },
    //-----------------------------------------------------
  ],
};
