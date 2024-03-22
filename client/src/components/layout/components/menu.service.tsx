export const titleHeader = (module: string) => {
    switch (module) {
        case 'settings':
            return `Portal Settings`
        case 'uesrAccess':
            return `User Access`
        case 'filter':
            return `Edit Table Column`
    }
}
