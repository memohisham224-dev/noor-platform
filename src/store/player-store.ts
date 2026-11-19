import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type State = { lessonId: string | null; time: number; rate: number; setTime:(t:number)=>void; setLesson:(id:string)=>void; setRate:(r:number)=>void }
export const usePlayer = create<State>()(persist((set)=>({ lessonId:null, time:0, rate:1, setTime:(time)=>set({time}), setLesson:(lessonId)=>set({lessonId, time:0}), setRate:(rate)=>set({rate}) }), { name:'noor-player' }))
