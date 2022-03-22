import React,{ useContext } from "react";

const SubjectContext = React.createContext();

export function useSubject() {
    return useContext(SubjectContext)
}
export function SubjectProvider({ children }) {
    const types = ["Matches", "True/False", "MCQs"]
    const difficulties = ["Easy", "Moderate", "Hard"]
    const subjects = ["English", "Maths", "Physics", "Chemistry", "Biology"]
    const topics = {
        English: ["Lorem", "ipsum", "dolor"],
        Maths: ["sit", "amet"],
        Physics: ["sit", "amet"],
        Chemistry: ["Lorem", "ipsum", "dolor"],
        Biology: ["sit", "amet"],
    }
    return (
        <SubjectContext.Provider value={{types,difficulties,subjects,topics}}>
            {children}
        </SubjectContext.Provider>
    )
}