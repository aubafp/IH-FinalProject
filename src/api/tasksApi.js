 import { supabase } from '@/api/supabase'

 const TABLE_NAME = 'tasks'

export const fetchAllTasks = async () => {
  const { data, error } = await supabase.from(TABLE_NAME).select('*')
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const createTask = async (task) => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .insert(task)
  if (error) {
    throw new Error(error.message)
  }
  return true
}


export const editTask = async (taskId, {title, dosis, hour}) => {
  
  const { error } = await supabase
    .from(TABLE_NAME)
    .update({title, dosis, hour})
    .eq('id', taskId)
  if (error) {
    throw new Error(error.message)
  }
  return true
}

export const changeStatus = async (taskId, newStatus) => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .update({ is_complete: newStatus })
    .eq('id', taskId)
  if (error) {
    throw new Error(error.message)
  }
  return true
}

export const deleteTask = async (taskId) => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', taskId)
  if (error) {
    throw new Error(error.message)
  }
  return true
}
