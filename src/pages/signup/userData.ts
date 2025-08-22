export interface UserItem {
    id: string,
    userid: string,
    pwd: string,
    nm: string,
    birthday: string,
    gendercd: string,
    cellno: string,
    adrr: string,
    detailaddr?: string,
    email: string
}

export const userList: UserItem[] = JSON.parse(localStorage.getItem('userList') || '[]');