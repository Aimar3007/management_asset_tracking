import { IImageSquare } from './image-square.interface'
const ImageSquare = ({ src, size = 30 }: IImageSquare) => {
    return (
        <div className={`aspect-w-1 aspect-h-1`} style={{ width: `${size}px` }}>
            <img src={src} alt="Img" />
        </div>
    )
}

export default ImageSquare
