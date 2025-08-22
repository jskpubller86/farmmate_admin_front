
// 이미지 파일 하나만 업로드 하도록 구현
const uploadFile =  async (uploadFile:File) =>{
    const formData = new FormData();
    formData.append('file', uploadFile!);
    const rs = {state:false, path:'', err:null};
    try {
        const res = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
        });
        
        if (res.ok) {
            rs.state = true;
            const data = await res.json();
            // data : { filename: aaaa.jpg, path: upload/aaaa.jpg}
            rs.path = 'http://localhost:5000' + data.path; 
        }
    } catch (err:any) {
        rs.err = err;
    }
    return rs;
}

export default uploadFile;