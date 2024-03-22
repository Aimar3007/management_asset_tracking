import Button from 'components/button/button.component'
import cableImage from '../../assets/img/gallery/404.png'
import { useNavigate } from 'react-router-dom'

const Page404 = () => {
    const navigate = useNavigate()
    return (
        <div className="w-screen h-screen bg-logistical-blue bg-opacity-40 flex justify-center py-[100px]">
            <div className="aspect-w-16 aspect-h-9 p-4 max-w-[600px] text-center">
                <img
                    src={cableImage}
                    alt="logo"
                    className={`max-w-auto h-auto`}
                />
                <div className="pt-12 font-bold text-size-XL">
                    Oops... Page Not Found
                </div>
                <div className="pt-4 text-size-M">
                    This page doesn’t exist or was removed! <br /> We suggest
                    you back to previous page.
                </div>
                <div className="w-100 pt-6">
                    <Button
                        className="w-full !text-white !h-[50px] font-bold !text-size-M"
                        variant="logistical-lightblue"
                        label="Back"
                        onClick={function (): void {
                            navigate('/')
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Page404
