import Button from 'components/button/button.component'
import './button-export.style.css'
import { IButtonExport } from './button-export.interface'
import useButtonExport from './button-export.service'

function ButtonExport({
    module,
    headers,
    onExport,
    exportType,
    getDataGenerate,
    generateReportData,
}: IButtonExport) {
    const { exportPdf, exportXlxs } = useButtonExport({
        headers,
        module,
        getDataGenerate,
        generateReportData,
    })

    return (
        <>
            <Button
                label="GENERATE REPORT"
                onClick={async () => {
                    if (exportType === 'pdf') exportPdf()
                    if (exportType === 'xlxs') exportXlxs()
                    onExport && onExport()
                }}
                className="w-full"
            />
        </>
    )
}
export default ButtonExport
