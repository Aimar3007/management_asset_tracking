/* eslint-disable no-unused-vars */
import { ITableColumn } from 'components/table/table.interface'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import logoExport from 'assets/img/logos/ControlGlobal.png'
import XLSX from 'xlsx-js-style'
import { Toast } from 'components/toast/toast.component'
import moment from 'moment'

const useButtonExport = ({ headers, module, getDataGenerate }: any) => {
    // varible
    const headerFilter = headers?.filter((header: ITableColumn) => {
        const exportThisColumn = header.exportColumn === false ? false : true
        if (exportThisColumn) {
            return true
        }
        return false
    })

    headerFilter?.filter((header: ITableColumn) => {
        const exportThisColumn = header.exportColumn === false ? false : true
        if (exportThisColumn) {
            return true
        }
        return false
    })

    // function export pdf
    const exportPdf = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
        })

        const img = new Image()
        img.src = logoExport

        autoTable(doc, {
            html: '#table-master',
            theme: 'striped',
            head: headerFilter.map((header: any) => {
                return header.label
            }),
            margin: {
                left: 15,
                right: 15,
                bottom: 5,
            },
            headStyles: {
                cellPadding: 5,
                lineWidth: 0,
                valign: 'top',
                fontStyle: 'bold',
                halign: 'left', // 'center' or 'right'
                fillColor: [1, 117, 161],
                textColor: [255, 255, 255],
                minCellHeight: 22,
            },
            styles: {
                minCellHeight: 24,
                cellPadding: {
                    top: 8,
                    right: 4,
                    bottom: 8,
                    left: 4,
                },
                fontSize: 8,
            },
            didDrawPage: () => {
                doc.text(`${module} Data`, 15, 30)
                doc.addImage(img, 'PNG', 755, 15, 50, 20, 'a', 'FAST')
            },
        })
        doc.save(`Logistical ${module}.pdf`)
    }

    // function export xlxs
    const exportXlxs = async () => {
        const data = await getDataGenerate()

        if (!data.length) {
            Toast({
                header: 'Failed',
                message: 'Filtered data is empty',
                type: 'error',
            })
            return
        }
        // Membuat workbook baru
        const wb = XLSX.utils.book_new()

        let headerReport: any = []
        let cols1: any = []

        headers.map((x: any) => {
            headerReport.push({
                v: x.label,
                t: 's',
                s: {
                    fill: { fgColor: { rgb: '00B0F2' } },
                    font: { bold: true, color: { rgb: 'FFFFFF' } },
                },
            })

            cols1.push({ wch: x?.widthCol }) // for width cols
        })

        const mapData = data?.map((x: any) =>
            headers?.map((y: any) => ({
                v: y.customBuild
                    ? y?.customBuild(x[y.accessor] || '')
                    : x[y.accessor] || '',
                t: 's',
                s: y?.styleXlxs,
            })),
        )

        // data to be exported
        const rows = [headerReport, ...mapData]

        // Create worksheet with rows
        const ws = XLSX.utils.aoa_to_sheet(rows)

        // Atur lebar kolom dalam worksheet
        ws['!cols'] = cols1

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

        // name file base on module
        let nameFile: string | null
        switch (module) {
            case 'Purchase Order':
                nameFile = 'Purchase_Orders'
                break
            case 'Shipment':
                nameFile = 'Shipment'
                break
            default:
                nameFile = ''
                break
        }
        // Write Excel file to browser
        XLSX.writeFile(
            wb,
            `Report_${nameFile}_${moment().format('DD-MM-YYYY_HH-mm-ss')}.xlsx`,
        )

        Toast({
            header: 'Sucess',
            message: 'The report was generated successfully',
            type: 'success',
        })
    }

    // fucntion for redesign generate report
    return { exportPdf, exportXlxs }
}
export default useButtonExport
