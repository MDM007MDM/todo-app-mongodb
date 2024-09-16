import React from 'react'

export interface ITodo {
    _id?: string;
    name: string;
    description: string;
    status: boolean;
    duedate: string;
}

export default function Todo({ todo, todoIndex, donHandler, updateHandler }: { todo: ITodo, todoIndex: number, donHandler: (todoIndex: number) => void, updateHandler: (todoIndex: number) => void }) {
    const timeConvert = (time: string) => {
        const date = new Date(time);
        return date.toLocaleString();
    }
    return (
        <div className='grid grid-cols-7 hover:bg-yellow-200 p-2 items-center rounded-xl text-center'>
            <div className='col-span-1' style={{textDecorationLine: todo.status == true ? 'line-through' : 'none'}}>
                {todo.name}
            </div>
            <div className='col-span-2'>
                {todo.description}
            </div>
            <div className='col-span-1'>
                {todo.status ? 'เสร็จแล้ว' : 'ยังไม่เสร็จ'}
            </div>
            <div className='col-span-2'>
                {timeConvert(todo.duedate)}
            </div>
            <div className='col-span-1'>
                <div className='grid gap-1'>
                    {
                        todo.status == true ? 
                        <button disabled className="bg-gray-300 text-white rounded-lg p-2 w-full" onClick={(() => {
                            updateHandler(todoIndex);
                        })}>เสร็จ</button>
                        :
                        <button className="bg-amber-800 text-white rounded-lg p-2 w-full" onClick={(() => {
                            updateHandler(todoIndex);
                        })}>เสร็จ</button>
                    }
                    <button className="bg-red-800 text-white rounded-lg p-2 w-full" onClick={(()=>{
                    donHandler(todoIndex);
                })}>ลบ</button>
                </div>
            </div>
        </div>
    )
}
