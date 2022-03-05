const menu = {
    101: {
        Rendering: false,
        url: '/',
        icon: 'mdi-home',
        text: 'Text.Menu.Home'
    },
    102: {
        Rendering: false,
        url: '/EULA',
        icon: 'mdi-bookmark',
        text: 'Text.Menu.EULA'
    },
    103: {
        Rendering: false,
        url: '/search',
        icon: 'mdi-magnify',
        text: 'Text.Menu.Search'
    },
    104: {
        Rendering: true,
        url: '/user/{userId}',
        icon: 'mdi-account-circle',
        text: 'Text.Menu.User'
    },
    105: {
        Rendering: true,
        url: '/user/{userId}/setting',
        icon: 'settings',
        text: 'Text.Menu.Setting'
    },
    107: {
        Rendering: false,
        url: '/author',
        icon: 'mdi-pencil',
        text: 'Text.Menu.Author'
    },
    108: {
        Rendering: false,
        url: '/author/manage',
        icon: 'mdi-gavel',
        text: 'Text.Menu.Manage'
    }
};

export {
    menu
}
