import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router-dom";


@inject('store')
@observer
class HeaderComponent extends Component {
	changeSidebarClick=()=>{
		this.props.onShowSidebarChange();
	};

	render() {
		return (
			<>
				<div className="border-gray-300 bg-white flex" style={{ height: "82px"}}>
					<div className="md:left-0 md:top-0 md:fixed container flex select-none justify-between bg-white " style={{zIndex:"999", borderBottomWidth:"1px", maxWidth:"100%"}}>
						<div className="flex items-center">
							<div className="flex items-center justify-items-center" style={{ height: "82px", width:"257px", borderRightWidth: "1px" }}>
								<img src="/logo/128867375.png" alt="AI to Social" style={{ height: "41px", width: "auto", marginLeft:"auto",marginRight:"auto"}} />
							</div>
							<div className="mx-6" style={{ display: "inline-block", height: "35px", width: "35px", background: "rgba(116,16,162,0.2)", textAlign: "center", lineHeight: "35px", borderRadius: "50%", fontSize: "14px", color: "rgba(116,16,162,1)", marginRight: "10px", cursor:"pointer" }} onClick={this.changeSidebarClick}>
								<i className="fa fa-bars"></i>
							</div>
							{/* <div style={{ display: "inline-block", height: "35px", width: "35px", background: "rgba(116,16,162,0.2)", textAlign: "center", lineHeight: "35px", borderRadius: "50%", fontSize: "14px", color: "rgba(116,16,162,1)", marginRight: "10px" }}>
								<i className="fas fa-expand"></i>
							</div> */}
						</div>
						<div className="relative text-gray-400 focus-within:text-green-500 flex flex-1 ">
							<label htmlFor="q" className="absolute inset-y-0 left-0 top-0 bottom-0 hidden md:flex items-center lg:pl-2 ">
								<div type="submit" className="p-2 focus:outline-none focus:shadow-outline ">
									<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6 transition"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
								</div>
							</label>
							<input
								type="search"
								tabIndex={-1}
								id="q"
								name="q"
								className="py-4 pl-4 md:pl-14 text-xl focus:outline-none focus:bg-white focus:text-gray-900 transition flex flex-1 w-full" placeholder="Search...  [Shortcut: Ctrl + K]" autoComplete="off"
								value={this.props.store.toolsKeyword}
								onChange={this.props.store.onChangeToolsKeyword}
								onKeyUp={this.onKeyUp}
							/>
						</div>
						<div className="flex items-center">
							<NavLink to="/my-profile">
								<div style={{ display: "inline-block", height: "35px", width: "35px", background: "rgba(116,16,162,0.2)", textAlign: "center", lineHeight: "35px", borderRadius: "50%", fontSize: "14px", color: "rgba(116,16,162,1)", marginRight: "50px"}}>
									<i className="fas fa-user"></i>
								</div>
							</NavLink>
						</div>
					</div>
				</div>
			</>
		)
	}
}


export default withRouter(HeaderComponent)