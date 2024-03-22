import { IRoleModule } from 'repository/data/role-module.interface'

const ModuleItems = ({
    isFocus,
    module,
    onclick,
}: {
    isFocus: boolean
    module: IRoleModule
    onclick: () => void
}) => {
    const { moduleName } = module
    const statusString = module.status ? 'ENABLED' : 'DISABLED'
    const textClass = isFocus ? '' : 'text-logistical-gray-ver1 cursor-pointer'
    const iconClass = isFocus ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'
    return (
        <div
            className={`border-b flex flex-initial w-full px-3 ${textClass} `}
            onClick={() => {
                onclick()
            }}
        >
            <div className={`flex-1 py-2 leading-tight min-h-[50px] `}>
                <div className="font-light text-size-S ">{moduleName}</div>
                <div className="font-bold text-size-XS">{statusString}</div>
            </div>
            <div className="flex-end flex items-center">
                <i className={iconClass} />
            </div>
        </div>
    )
}

export default ModuleItems
