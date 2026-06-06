import { Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

export default function FileUpload() {
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		multiple: false,
		accept: {
			'image/*': [],
		},
		onDrop: files => {
			console.log(files)
		},
	})

	return (
		<>
			<div {...getRootProps()}>
				<input {...getInputProps()} />

				{isDragActive ? (
					<div className='drag-and-drop-wrapper w-72.5 h-74 rounded-xl border-2 border-[#A1A3AB] flex flex-col justify-center items-center gap-5 text-[#A1A3AB] cursor-pointer'>
						<Upload size={150}/>
					</div>
				) : (
					<div className='drag-and-drop-wrapper w-full p-7 rounded-xl border-2 border-[#A1A3AB] flex flex-col justify-center items-center gap-5 text-[#A1A3AB] cursor-pointer'>
						<img
							className='w-25'
							src='/dashboard/imgUploadIcon.png'
							alt='dragAndDrop'
						/>
						<span className='text-center'>
							Drag&Drop files here <br /> or
						</span>
						<button className='rounded-2xl border-2 cursor-pointer border-[#A1A3AB] px-5 py-3 text-xl'>
							Browse
						</button>
					</div>
				)}
			</div>
		</>
	)
}
