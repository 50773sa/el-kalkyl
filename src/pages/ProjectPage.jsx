import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Project from '../components/project/Project'
import { useAuthContext } from '../contexts/AuthContextProvider'
import useGetProject from '../hooks/useGetProject'


const ProjectPage = () => {
    const { projectId } = useParams()
	const { currentUser } = useAuthContext()
	const { data: project, loading } = useGetProject(projectId)
	const navigate = useNavigate()

    
    return (
        <Container>
           <Project project={project} loading={loading} projectId={projectId}/>
        </Container>
    )
}

export default ProjectPage