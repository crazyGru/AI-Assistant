import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { computed, } from 'mobx'
import MainBody from './Components/Body'
import { Helmet } from "react-helmet";

import { observer, inject } from 'mobx-react'

import { NavigationBar } from './Components/NavigationBar';


@inject('store')
@observer
class Body extends Component {

	state = {
		currentIdx: 0
	}

	@computed get permissions() {
		return this.props.store.tools.filter(tool =>
			tool.permissions.some(r => this.props.store.profile.permissions.includes(r))
		)
	}

	@computed get beta() {
		return this.permissions.filter(tool => tool.category === 'Beta')
	}


	@computed get personal() {
		return this.permissions.filter(tool => tool.category === 'Personal')
	}

	@computed get business() {
		return this.permissions.filter(tool => tool.category === 'Business')
	}

	@computed get social() {
		return this.permissions.filter(tool => tool.category === 'Social')
	}

	@computed get content() {
		return this.permissions.filter(tool => tool.category === 'Ads')
	}

	@computed get programming() {
		return this.permissions.filter(tool => tool.category === 'Article')
	}

	render() {
		const navigationHandler = (idx) => {
			this.setState({
				currentIdx: idx
			})
		}

		return (
				<div>
					<Helmet>
						<title>{`AI-to-Social`}</title>
					</Helmet>
					<MainBody>

						<NavigationBar navigationHandler={navigationHandler} />
						{this.state.currentIdx <= 1 && this.programming.length ? <>
							<Title title="Article And Blogs" />
							<Grid>
								{this.programming.map((tool, index) =>
									<Tool
										key={index}
										group={tool.category}
										title={tool.title}
										to={tool.to}
										Icon={tool.Icon}
										desc={tool.desc}
										fromColor={tool.fromColor}
										toColor={tool.toColor}
									/>)}
							</Grid>
							<Divider />
						</> : null}

						{(this.state.currentIdx === 0 || this.state.currentIdx === 2) && this.content.length ? <>
							<Title title="Ads And Marketing Tools" />
							<Grid>
								{this.content.map((tool, index) =>
									<Tool
										key={index}
										group={tool.category}
										title={tool.title}
										to={tool.to}
										Icon={tool.Icon}
										desc={tool.desc}
										fromColor={tool.fromColor}
										toColor={tool.toColor}
									/>)}
							</Grid>
							<Divider />
						</> : null}

						{(this.state.currentIdx === 0 || this.state.currentIdx === 3) && this.social.length ? <>
							<Title title="Social Media" />
							<Grid>
								{this.social.map((tool, index) =>
									<Tool
										key={index}
										group={tool.category}
										title={tool.title}
										to={tool.to}
										Icon={tool.Icon}
										desc={tool.desc}
										fromColor={tool.fromColor}
										toColor={tool.toColor}
									/>)}
							</Grid>
							<Divider />
						</> : null}


					</MainBody>
				</div>
		)
	}
}

export const Divider = () => <div className="divide-y-2 divide-dashed divide-gray-300 py-8 md:py-12"> <div></div>
	<div></div></div>

export const Title = ({ title }) => <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-4 md:mb-6">
	{title}
</h2>

export const Grid = ({ children }) => <div className="grid grid-cols-1 gap-8 mt-4 lg:grid-cols-2 xl:grid-cols-3 ">{children}</div>

export const Tool = ({ Icon, title, desc, to, group, fromColor, toColor }) => <Link to={to || "/"} className="flex relative ">

	<div className={`bg-white flex-1 rounded-xl transition hover:shadow-md overflow-hidden md:max-w-1lg text-gray-500 cursor-pointer border border-gray-300 md:flex relative transform hover:scale-105  hover:text-black`}>
		<div className="p-4">
			<div className={`uppercase tracking-wide text-sm text-${fromColor ? fromColor : "green-500"} font-semibold leading-none`}>{group || "New"}</div>
			<div href="#" className="block text-lg xl:text-xl 2xl:text-2xl leading-tight font-medium text-black leading-none">{title}</div>
			<p className="mt-1 pr-1 text-sm ">{desc} </p>
		</div>
	</div>
</Link>



export default Body