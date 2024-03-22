/** @type {import('tailwindcss').Config} */

module.exports = {
    mode: 'jit',
    purge: {
        content: [
            './src/**/*.{js,jsx,ts,tsx,css}',
            'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx,css}',
        ],
    },
    theme: {
        screens: {
            mobile: { max: '479px' },
            sm: { max: '768px' },
            md: { min: '768px' },
            lg: { min: '1024px' },
            xl: { min: '1280px' },
            '2xl': { min: '1536px' },
        },
        extend: {
            ringWidth: {
                0.5: '0.5px',
            },
            animation: {
                'slide-in': 'slide-in 0.5s',
                'slide-out': 'slide-out 0.5s',
            },
            borderRadius: {
                'logistical-radius-2': '2px',
                'logistical-radius': '5px',
            },
            colors: {
                'obo-main-gray': 'rgb(94, 110, 130)',
                'obo-main-border': '#c8c9cd',
                'obo-main-background': '#f6f7fb',
                white: '#FFFFFF',

                // blue
                'logistical-blue': '#00B0F2', // LOGISTICAL
                'logistical-blue-ver1': '#74D9FF',
                'logistical-blue-ver2': '#74A8FF',
                'logistical-blue-ver3': '#00AEEF',
                'logistical-blue-ver4': '#008CC1',
                'logistical-blue-ver5': '#0075A1', // LOGISTICAL DARK
                'logistical-blue-ver6': '#BEEDFF',
                'logistical-blue-ver7': '#00256B',

                // grey
                'logistical-gray-ver1': '#BEC0D8',
                'logistical-gray-ver2': '#9BA0B43B',
                'logistical-gray-ver3': '#AEB3BC',
                'logistical-gray-ver4': '#424A58',
                'logistical-gray-ver5': '#ECECEC',
                'logistical-gray-ver6': '#D3D8DC',
                'logistical-gray-ver7': '#C9CCD2',
                'logistical-gray-ver8': '#707785',
                'logistical-gray-ver9': '#EEF7FB',
                'logistical-gray-ver10': '#f0f5f6',
                'logistical-gray-light': '#F1F5F6',
                // green
                'logistical-green': '#96F287',
                'logistical-dark-green': '#2F6926',
                'logistical-green-ver1': '#02FFA8',
                'logistical-green-ver2': '#96F287',
                'logistical-green-ver3': '#B1FFE4',
                'logistical-green-ver4': '#CFF6D0',
                'logistical-green-dark-ver1': '#2F6926',

                // red
                'logistical-red-ver1': '#FF004E',
                'logistical-red-light': '#FFC2D5',
                'logistical-red-ver2': '#D61F1F',
                'logistical-red-ver3': '#C61919',

                // dark red
                'logistical-red-dark-ver1': '#700023',

                //yellow
                'logistical-yellow-ver1': '#FDFFC9',

                //dark yellow
                'logistical-yellow-dark-ver1': '#9D7206',

                'logistical-pink': '#FF00E6',
                'logistical-pink-dark': '#390040',
                'logistical-green-dark': '#016744',
                'logistical-blue-dark': '#2F92B8',
                'logistical-grey': '#AEB3BC',
                'logistical-grey-dark': '#414A58',
                'logistical-yellow': '#FFB726',
                'logistical-yellow-soft': '#ffb72724',
                'logistical-yellow-dark': '#854b00',
                'logistical-yellow-dark-ver2': '#9D7206',
                'logistical-red': '#aa0404',
                'logistical-red-soft': '#aa04041c',

                'logistical-red-dark': '#aa0404',

                // color asset management
                // primary: '#2E8B57',
                // 'dark-green': '#006400',
                'dark-green': '#205a41',
                green: '#2e8b57',
                'light-green': '#69d09f',
            },
            backgroundImage: {},
            maxWidth: {
                90: '90%',
            },
            width: {
                emailWidth: '510px',
                nameWidth: '335px',
                btnIconWidth: '40px',
                btnSmallWidth: '120px',
                btnRegularWidth: '180px',
                btnLongWidth: '220px',
                'sidebar-xl': '300px',
                inputSmall: '100px',
                inputMedium: '180px',
                inputLarge: '250px',
                inputExtraLarge: '400px',
            },
            boxShadow: {
                'btn-shadow-blue-light':
                    '0px 0px 0px 4px rgba(0, 174, 239, 0.2)',
                'btn-shadow-blue-dark':
                    '0px 0px 0px 4px rgba(0, 174, 239, 0.4)',
            },
            boxShadowColor: {},
            padding: {
                'small-x': '10px',
                'small-y': '12px',
            },
            margin: {
                'small-x': '10px',
                'small-y': '12px',
            },
        },
        fontFamily: {
            bahnschrift: ['Bahnschrift'],
        },
        fontSize: {
            'size-XS': '12px',
            'size-S': '14px',
            'size-M': '16px',
            'size-L': '20px',
            'size-XL': '24px',
            'size-XXL': '30px',
        },
    },
    plugins: [require('flowbite/plugin')],
}
