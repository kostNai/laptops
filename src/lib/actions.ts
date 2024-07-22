'use server'

const API_LINK =
	'http://127.0.0.1:8000/api'

import axios from 'axios'

export const login = async (
	formData: FormData
) => {
	const data =
		Object.fromEntries(formData)
	try {
		const res = await axios.post(
			`${API_LINK}/login`,
			{
				...data
			}
		)
		return res
	} catch (err) {
		console.log(err)
		return err
	}
}
