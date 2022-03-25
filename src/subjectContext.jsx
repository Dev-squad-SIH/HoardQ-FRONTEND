import React,{ useContext, useEffect, useState } from "react";

import {ApiService} from './api.services'
const SubjectContext = React.createContext();
export function useSubject() {
    return useContext(SubjectContext)
}
export function SubjectProvider({ children }) {
    const [types, setTypes] = useState([])
    const [difficulties, setDifficulties] = useState([])
    const [subjects, setSubjects] = useState([])
    const [topics, setTopics] = useState({})
    // Avoid empty data during load time
    useEffect(() => {
        async function fetchData() {
            const res = await ApiService.getDropdownOptions()
            setTypes([...res.data.types])
            setDifficulties([...res.data.difficulties])
            setSubjects([...res.data.subjects])
            setTopics(res.data.topics)
        }
        fetchData()
    }, [])
    return (
        <SubjectContext.Provider value={{types,difficulties,subjects,topics}}>
            {children}
        </SubjectContext.Provider>
    )
}