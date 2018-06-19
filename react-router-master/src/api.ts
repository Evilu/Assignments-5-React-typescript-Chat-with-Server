export function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}


export async function getAllUsers(): Promise<any> {
    return await fetch ("http://localhost:4000/user")
        .then((res)=>{
            return res.json();
        })
}

export async function updateUsers(user: User) {
    await delay(2500);
     throw new Error(`User ${user.id} does not exist`);
}

export interface User {
    id: number;
    name: string;
}
