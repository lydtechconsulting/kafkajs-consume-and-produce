module.exports = async function () {
	const globalAny: any = global;
	await globalAny.__KAFKA_CONTAINER__.stop()
	await globalAny.__POSTGRES_CONTAINER__.stop()
	await globalAny.__NETWORK__.stop()
};
