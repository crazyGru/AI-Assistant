import Loader from './Loader'
import { DuplicateIcon, ExclamationCircleIcon } from '@heroicons/react/outline'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'


import OutputEditor from './OutputEditor';

export const Output = inject('store')(observer(({ store, title, desc, Icon, output, code, language, outputs, loading, children, fromColor, toColor, outputsColor, OutputsIcon }) => {


	return (
		<div className="relative mb-12">
			<div className=" align-bottom bg-white md:rounded-3xl text-left  shadow-xl transform transition-all sm:align-middle transition shadow-md hover:shadow-2xl focus:shadow-2xl" style={{ minHeight: "750px" }}>
				<div className=" px-6 py-6">
					<div className="sm:flex sm:items-start">
						{loading ? <>
							<Loader active={loading} className="w-10 h-10" />
						</> : <>
							<div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-${output ? "green" : "gray"}-300 sm:mx-0 sm:h-10 sm:w-10 bg-gradient-to-r from-${fromColor ? fromColor : "green-400"} to-${toColor ? toColor : "blue-500"}`}>
								{Icon ? <Icon className={`h-6 w-6 text-white`} aria-hidden="true" /> : null}
							</div>
						</>}
						<div style={{display:'flex'}}>
							<div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
								<div as="h3" className="text-lg leading-6 font-medium text-gray-900">
									{title}
								</div>
								<p className="text-sm text-gray-500">The AI helps us to know all the angles of the world.</p>
							</div>
						</div>
					</div>
					<div className="divide-y divide-dashed divide-gray-300"> <div></div><div></div></div>
					<div>
						<OutputEditor store={store} output={output}></OutputEditor>
					</div>
				</div>
			</div>
		</div>)
}))



export const QuickTools = inject('store')(observer(({ store, output, outputs, code }) => {
	return (
		<>
			<div className="flex">

				<Shortcut className="p-1 rounded-lg cursor-pointer hover:bg-green-200 hover:text-green-700 relative group flex flex-col items-center group text-gray-300"
					onClick={() => store.copyToClipboard(output || code || outputs)}
				>
					<DuplicateIcon className="w-5 h-5" />
					<Tooltip className="absolute bottom-2 flex flex-col items-center mb-6 group-hover:flex">
						<span className="relative z-10 p-3 text-sm leading-none text-gray-800 bg-white bg-opacity-25 shadow-lg text-center backdrop-filter backdrop-blur rounded-md">Copy text to clipboard</span>
					</Tooltip>
				</Shortcut>
				<div className="flex-1"></div>
				<Shortcut className="p-1 rounded-lg cursor-pointer hover:bg-red-200 hover:text-red-700 relative group flex flex-col items-center group text-gray-300" onClick={() => store.reportToFeedback(output || code || outputs)}>
					<ExclamationCircleIcon className="w-5 h-5" />
					<Tooltip className="absolute bottom-2 flex flex-col items-center mb-6 group-hover:flex">
						<span className="relative z-10 p-3 text-sm leading-none text-gray-800 bg-white bg-opacity-25 shadow-lg text-center backdrop-filter backdrop-blur rounded-md">Report issue with output</span>
					</Tooltip>
				</Shortcut>
			</div>
		</>
	)
}))

const Tooltip = styled.div`
	display:none;
	white-space: nowrap;
`

const Shortcut = styled.div`
	&:hover ${Tooltip} {
		display: flex;
	}
`



export default Output