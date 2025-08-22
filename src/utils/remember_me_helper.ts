

const rememberMeHelper = () => {
    const rememberMe = 'rememberMe';
    const rememberMeExpires = 'rememberMe_expires';
    /**
     * 자동로그인 정보 저장
     */
    const saveRemember = () => {
        localStorage.setItem(rememberMe, 'true');
        // 자동로그인 쿠키를 받으면 1일 보관
        localStorage.setItem(rememberMeExpires, (Date.now() + 86400 * 1000).toString());
    }

    /**
     * 자동로그인 정보 제거
     */
    const removeRemember = () => {
        localStorage.removeItem(rememberMe);
        localStorage.removeItem(rememberMeExpires);
    }

    /**
     * 자동로그인 유효기간 체크
     * @return
     */
    const isRememberExpires = ()=>{
        return Date.now() > parseInt(localStorage.getItem(rememberMeExpires) || '0', 10)
    }

    /**
     * 자동로그인 활성화 여부 체크
     * @return
     */
    const isValidRemember = ()=>{
        return localStorage.getItem(rememberMe) === 'true'
    }
    
    return {saveRemember, removeRemember, isRememberExpires, isValidRemember, name: rememberMe}
}

export default rememberMeHelper();