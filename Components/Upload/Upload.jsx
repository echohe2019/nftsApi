import Image from 'next/image';
import {Delete, UploadIcon, File} from '../SVG/index'
import styles from './Upload.module.css';

const Upload = ({onImageChange, display, retrieveFile}) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {display==null?(
                    <>
                        <UploadIcon/>
                        <p>Browse File to upload!</p>
                    </>
                ):(
                    <p>
                        <Image className={styles.image} src={display} alt='image' width={200} height={200}/>
                    </p>
                )}
            </div>
            <label htmlFor='file' className={styles.footer}>
                <File/>
                <p>Not Selected file</p>
                <Delete/>
            </label>
            <input id='file' type='file' style={{display:'none'}} onChange={(e)=>(onImageChange(e),retrieveFile(e))}/>
        </div>
    )
};

export default Upload;
