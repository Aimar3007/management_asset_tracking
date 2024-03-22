import './pagination.style.css'
import { IPagination } from './pagination.interface'
import Button from 'components/button/button.component'

function Pagination({ meta, ...props }: IPagination) {
    const indexStart = meta.indexStart ?? 0
    const indexEnd = meta.indexEnd ?? 0
    const totalItems = meta.totalItems ?? 0
    return (
        <div className="pagination-container flex-none">
            <div className="flex flex-row">
                <ul className="pagination">
                    <Button
                        icon="ri-arrow-left-s-line"
                        variant="logistical-white"
                        type="button"
                        isDisabled={indexStart <= 1}
                        className={`w-btnIconWidth mx-4`}
                        onClick={() =>
                            props.nextHandling &&
                            props.nextHandling(meta.currentPage - 1)
                        }
                    />
                    <li className="page-of font-[1000]">{`${indexStart} - ${indexEnd} `}</li>
                    <li className="page-of font-[10]">{`of `}</li>
                    <li className="page-of font-[1000]">{`${totalItems}`}</li>
                    <li className="page-of font-[10]">{`list`}</li>
                    <Button
                        icon="ri-arrow-right-s-line"
                        variant="logistical-white"
                        type="button"
                        isDisabled={meta.currentPage === meta.totalPage}
                        className={`w-btnIconWidth mx-4`}
                        onClick={() =>
                            props.nextHandling &&
                            props.nextHandling(meta.currentPage + 1)
                        }
                    />
                </ul>
            </div>
        </div>
    )
}

export default Pagination
