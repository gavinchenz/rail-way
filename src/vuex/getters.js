const getters =  {  
    isLogin:state =>  state.isLogin,
	token: state => state.user.token,
	avatar: state => state.user.avatar,
	name: state => state.user.name,
	roles: state => state.user.roles,
	isLock: state => state.user.isLock,
	lockPasswd: state => state.user.lockPasswd  
}

export default getters