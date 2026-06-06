import { Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

type Props = {
	image: File | null
	setImage: (image: File | null) => void
}

export default function FileUpload({ setImage, image }: Props) {
	const { getRootProps, getInputProps, isDragActive, fileRejections } =
		useDropzone({
			multiple: false,
			accept: {
				'image/*': [],
			},
			onDrop: files => {
				setImage(files[0] ?? null)
			},
			maxSize: 5 * 1024 * 1024,
		})

	const error = fileRejections[0]?.errors[0]

	function handleRemoveFile(e: React.MouseEvent) {
		e.stopPropagation()
		setImage(null)
	}

	return (
		<>
			<div {...getRootProps()}>
				<input {...getInputProps()} />

				{image ? (
					<div className='drag-and-drop-wrapper w-72.5 h-74 rounded-xl border-2 border-[#A1A3AB] flex flex-col justify-center items-center gap-5 text-[#A1A3AB] cursor-pointer'>
						<img
							className='w-25'
							src='/dashboard/imgUploadIcon.png'
							alt='dragAndDrop'
						/>
						<p className='w-full wrap-break-word p-5 text-center'>
							{image.name}
						</p>
						<button
							type='button'
							className='cursor-pointer underline'
							onClick={handleRemoveFile}
						>
							remove
						</button>
					</div>
				) : isDragActive ? (
					<div className='drag-and-drop-wrapper w-72.5 h-74 rounded-xl border-2 border-[#A1A3AB] flex flex-col justify-center items-center gap-5 text-[#A1A3AB] cursor-pointer'>
						<Upload size={150} />
					</div>
				) : (
					<div className='drag-and-drop-wrapper w-72.5 h-74 rounded-xl border-2 border-[#A1A3AB] flex flex-col justify-center items-center gap-5 text-[#A1A3AB] cursor-pointer'>
						<img
							className='w-25'
							src='/dashboard/imgUploadIcon.png'
							alt='dragAndDrop'
						/>
						<span className='text-center'>
							Drag&Drop files here <br /> or
						</span>
						<button
							type='button'
							className='rounded-2xl border-2 cursor-pointer border-[#A1A3AB] px-5 py-3 text-xl'
						>
							Browse
						</button>
					</div>
				)}
				{error && (
					<p className='text-red-500 text-center'>
						{error.code === 'file-too-large'
							? 'File has to be less than 5 MB'
							: error.code === 'file-invalid-type'
								? 'Only .jpeg/webp/png are allowed'
								: 'The file is wrong'}
					</p>
				)}
			</div>
		</>
	)
}
