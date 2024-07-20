import axios from 'axios'

export const getProducts = async () => {
	const res = await axios.get(
		`${process.env.API_LINK}/products`
	)
	return res?.data?.products
}

export const getProduct = async (
	productId: string
) => {
	const res = await axios.get(
		`${process.env.API_LINK}/products/${productId}`
	)
	return res
}

export const getCpuList = async () => {
	const res = await axios.get(
		`${process.env.API_LINK}/cpu`
	)

	return res.data.cpu_list
}
