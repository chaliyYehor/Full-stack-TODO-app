import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetAllTodos } from '../../hooks/useGetAllTodos'
import dayjs from 'dayjs'
import { SquarePen, Trash } from 'lucide-react'
import { useDeleteTodo } from '../../hooks/useDeleteTodo'

export default function ViewTask() {
	const navigate = useNavigate()
	const { todoId } = useParams()
	const { data: todos } = useGetAllTodos()
	const todo = todos?.filter(todo => todo._id === todoId)
	const { mutateAsync: deleteTodo, isPending: isDeleting } = useDeleteTodo()
	if (!todo) return
	const {
		title,
		priority,
		status,
		createdAt,
		taskDescription,
		imageUrl,
		updatedAt,
	} = todo[0]

	const formattedDate = dayjs(createdAt).format('DD/MM/YYYY')

	const difference = dayjs(updatedAt).diff(dayjs(createdAt), 'day')

	let statusColor =
		status === 'Not Started'
			? '#F21E1E'
			: status === 'In Progress'
				? '#0225FF'
				: '#05A301'

	const priorityColor =
		priority === 'Extreme'
			? '#F21E1E'
			: priority === 'Moderate'
				? '#3ABEFF'
				: '#05A301'

	const deleteTodoOnClick = async () => {
		try {
			if (!todoId) return
			await deleteTodo({ taskId: todoId })
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className='viewTaskWrapper relative w-full h-[calc(100dvh-13rem)] mb-10 mt-15 ml-20 border-2 border-[#A1A3AB] rounded-2xl p-8'>
			<button
				type='button'
				className='cursor-pointer text-xl font-semibold underline absolute right-10'
				onClick={() => {
					navigate(-1)
				}}
			>
				Go Back
			</button>
			<div className='flex gap-5 mb-20'>
				{imageUrl && (
					<div className='w-75 max-h-75 overflow-hidden'>
						<img className='object-cover w-full' src={imageUrl} alt='img' />
					</div>
				)}
				<div className='todo-info text-[13px] flex flex-col gap-5'>
					<h2 className='font-bold text-4xl capitalize max-w-[80%] wrap-normal'>
						{title}
					</h2>
					<div className='spanWrapper flex flex-col gap-2 text-[20px]'>
						<span>
							Priority:{' '}
							<span
								className='font-semibold'
								style={{
									color: priorityColor,
								}}
							>
								{priority}
							</span>
						</span>
						<span>
							Status:{' '}
							<span className='font-semibold' style={{ color: statusColor }}>
								{status}
							</span>
						</span>
						<span className='text-[#A1A3AB]'>Created on: {formattedDate}</span>
						<span className='text-[#A1A3AB]'>
							{difference === 0
								? 'Completed today.'
								: `Completed ${difference} days ago.`}
						</span>
					</div>
				</div>
			</div>
			<div>
				<div className='text w-[80%] h-[20%] overflow-y-scroll'>
					<p className='text-[#747474] w-full max-h-95 text-[18px] capitalize'>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum,
						doloremque. Molestiae minus aperiam voluptatum exercitationem fuga
						delectus officiis placeat nisi, consectetur, saepe deserunt aliquam
						provident maiores quis cumque facere tempore architecto voluptatem
						quaerat aut earum. Ab quisquam a ipsum inventore iusto consequatur
						exercitationem aspernatur similique voluptate, neque corporis nemo,
						reiciendis itaque consectetur distinctio? Voluptatem qui nulla
						distinctio! Error, repellat accusantium reiciendis dolorum impedit
						quam! Libero officia iste illum, delectus molestias voluptas
						quaerat! Consectetur quam, autem cupiditate aperiam unde officiis.
						Reprehenderit nam minima ratione soluta nulla? Ut delectus harum
						omnis, cumque aperiam reprehenderit praesentium nemo placeat illo
						quisquam enim aliquam fuga maxime minima, recusandae iusto numquam
						labore rerum! Accusamus tempora pariatur quasi culpa molestias
						maxime labore ab repellat nulla odit nihil possimus est itaque sint,
						corrupti quod temporibus sunt eligendi expedita reiciendis
						consequatur quae quos, commodi iure! Qui debitis neque quis eaque
						cum accusamus quo eligendi quam consequatur quia hic, facilis vero
						nisi, modi ut ipsum? Eaque commodi libero minima corporis earum,
						eius, minus dolores reprehenderit voluptates, dolorum maiores
						aliquam animi dicta. Non numquam dolore explicabo neque debitis
						suscipit amet, in, hic voluptate ipsam asperiores ullam assumenda
						culpa, dolores facilis nobis! Nesciunt natus fugit ea sunt repellat
						vero autem similique consequatur, ducimus ipsum atque provident
						minus iste inventore possimus. Perspiciatis consequatur possimus
						iste illo fugit, cupiditate quod dolorem harum ad ipsam fuga
						blanditiis incidunt enim culpa sapiente perferendis dicta a nulla
						soluta officia eos neque aliquid. Reiciendis ipsam necessitatibus
						error nostrum cupiditate debitis magni voluptate atque sed.
						Similique, facilis ducimus. Incidunt asperiores rerum amet? Magni
						excepturi soluta repellat voluptatibus ex officiis at asperiores
						consectetur nisi! Laudantium unde iusto a temporibus inventore
						laboriosam quia deleniti aliquam cum sunt doloremque labore amet
						dolores quis sint laborum eos, eum, adipisci error expedita
						praesentium similique architecto ab iure! Amet maxime ullam ipsam,
						dignissimos neque quos sunt fuga aut molestias impedit dolore!
						Dignissimos animi doloribus numquam expedita maxime ab labore,
						corporis, consequuntur aut iusto architecto amet aliquid omnis
						provident laborum asperiores impedit! Aut minima nulla at aspernatur
						voluptatibus temporibus necessitatibus hic, repudiandae beatae,
						harum, maiores accusantium! Vitae aliquid esse fugiat, illo nobis
						distinctio vero velit maiores, non qui praesentium similique.
						Doloremque eius totam voluptate aut repellendus pariatur hic rem
						obcaecati rerum, quos perferendis? Doloremque nesciunt excepturi
						iste porro sit repudiandae quis fuga cumque amet voluptatem sunt et
						unde assumenda dolores, dolorum, exercitationem eius velit
						asperiores error quibusdam dolorem tempora tenetur? Cumque quos a,
						quia ducimus ipsum, cupiditate delectus aspernatur repellat
						voluptatum odio minus doloribus, quas harum qui placeat? Sequi nisi
						accusantium dolor distinctio explicabo libero, eveniet possimus
						inventore facilis laborum officia perferendis, dolorem voluptatum
						labore ipsam! Laborum aliquam dicta sapiente excepturi quas est quis
						reiciendis maxime, amet nam eos laudantium accusantium explicabo
						debitis, ab ullam dolorem. A, tempora quibusdam corporis omnis, ab
						eveniet magnam sit maxime numquam, asperiores vero nostrum. Beatae
						sint dolore suscipit incidunt dolor expedita voluptatum labore quasi
						adipisci explicabo quibusdam perspiciatis inventore dolorem iste ad
						consequatur, totam ipsa, veritatis distinctio ducimus? Quae sed quo
						molestias. Omnis fugiat expedita aperiam repellendus minus, libero
						distinctio atque? Temporibus quas sit modi mollitia nam optio
						repellat dolorem necessitatibus reprehenderit harum earum, quibusdam
						debitis rem culpa molestias, voluptates perferendis, incidunt quasi!
						Cupiditate possimus, beatae, dolore iusto fugit architecto
						blanditiis commodi soluta laboriosam a eveniet autem? Fugit enim
						sunt nulla eaque, aperiam alias repellendus adipisci voluptatibus
						quia illum sed quasi iusto eligendi ut distinctio dignissimos
						architecto cumque possimus, vel eveniet temporibus iste. Quae maxime
						nobis id exercitationem quaerat quas, nam dolores ab voluptatum amet
						ipsam praesentium quibusdam velit aliquam aliquid, iusto possimus
						dolorum pariatur inventore dolorem eaque necessitatibus? Repellendus
						incidunt magni tenetur distinctio libero molestiae eaque praesentium
						quibusdam ipsum culpa et recusandae accusamus facilis reiciendis
						perspiciatis unde ea temporibus nesciunt dolorum inventore, nam
						voluptate. Numquam et ex quisquam incidunt sunt beatae placeat
						eveniet, nobis totam dolores quaerat. Dolores a error placeat magnam
						consectetur at, aliquam dignissimos facilis perspiciatis! Voluptate
						incidunt tempore atque illo enim vero autem impedit assumenda
						corporis sed, molestiae, fugit temporibus inventore nihil in cum
						distinctio, labore qui ipsam fugiat reiciendis necessitatibus maxime
						quis magnam! Deserunt consectetur, in rerum necessitatibus quas
						quasi culpa nemo quidem voluptas ipsum ex unde perspiciatis
						architecto, qui cupiditate minus odit tenetur, iste error! Qui
						laudantium distinctio alias pariatur suscipit quod odio, molestiae
						in nam culpa inventore exercitationem impedit doloremque eos
						cupiditate reprehenderit veritatis unde soluta molestias incidunt
						asperiores. Sunt esse reprehenderit architecto assumenda quaerat a
						doloremque dolorum. Vero distinctio, voluptas nemo obcaecati sequi
						assumenda odit magni eum nulla tempora ad sapiente reprehenderit
						alias unde nesciunt accusantium corporis. Omnis pariatur quibusdam
						debitis ut provident voluptatem incidunt distinctio aliquam
						obcaecati corrupti magnam corporis sed, non doloribus reprehenderit
						eius quasi eaque, ea velit eligendi, exercitationem atque.
						Repellendus, dignissimos, ullam odio consectetur aperiam vitae
						doloremque dolorum ipsum, qui quisquam deleniti omnis in. Dolor ad,
						architecto fugiat nihil, adipisci illum optio, quia incidunt modi
						delectus earum. Laborum repellat sapiente rerum ad voluptate optio
						eveniet provident vero culpa non, fugiat dolore ex corrupti,
						mollitia quis consectetur ipsa veniam accusamus eligendi vitae eos,
						maxime architecto nemo. Nam minus illo quis numquam animi, tenetur
						in unde, esse voluptas delectus quam impedit vero suscipit
						dignissimos officia quia aliquid est maxime ullam veritatis rem
						velit sequi. Recusandae est id distinctio, nisi, sit placeat
						reprehenderit quia amet debitis commodi iste modi explicabo autem
						ducimus suscipit rem eveniet voluptate ut consequatur. Repellendus
						quidem quas officiis dolorem placeat, adipisci necessitatibus fugiat
						voluptate sed labore officia repudiandae, sapiente deleniti odit
						harum saepe ducimus alias! Necessitatibus vel et tempore, sed natus
						ipsam in numquam debitis, illo nemo, magnam beatae ab distinctio.
						Nesciunt doloribus, neque nemo obcaecati repellat odio aliquam? Ex
						omnis tempora molestias temporibus natus eos, ea quisquam, iure eius
						excepturi fugiat labore accusantium cupiditate explicabo sed
						aperiam! Corporis minima aliquid suscipit autem, similique officiis
						in ipsam eligendi ex eius quisquam perferendis laboriosam quam
						delectus? Iusto at ullam atque asperiores nobis aliquid quia laborum
						animi quos impedit perspiciatis ipsum repellat esse est quis
						recusandae inventore facilis saepe, optio, itaque accusantium. Natus
						necessitatibus alias odit nulla. Enim ut debitis id esse ipsa,
						asperiores ex necessitatibus eum mollitia? Possimus?
					</p>
				</div>
			</div>
			<div className='tools w-fit flex gap-5 absolute bottom-5 right-5'>
				<div className='delete cursor-pointer bg-[#FF6767] hover:bg-[#d65a5a] transition flex justify-center items-center w-15.5 h-15.5 rounded-2xl'>
					{isDeleting ? (
						<div className='w-full h-full flex justify-center items-center'>
							<div className='loader ' />
						</div>
					) : (
						<Trash color='white' size={30} />
					)}
				</div>
				<div className='editTask cursor-pointer bg-[#FF6767] hover:bg-[#d65a5a] transition flex justify-center items-center w-15.5 h-15.5 rounded-2xl'>
					<Link
						className='w-full h-full inline-flex justify-center items-center'
						to={`/editTask/${todoId}`}
					>
						<SquarePen color='white' size={30} />
					</Link>
				</div>
			</div>
		</div>
	)
}
