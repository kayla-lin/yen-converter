export function isCacheOutdated(data: any, lastUpdated: number | null) {
	const isCacheNotFound =
		lastUpdated === null || lastUpdated === undefined || !data
	const isOutdated = lastUpdated !== null && isMoreThan12Hours(lastUpdated)

	return isCacheNotFound || isOutdated
}

function isMoreThan12Hours(lastUpdatedTime: number) {
	const time1Millis = lastUpdatedTime
	const time2Millis = new Date().getTime()

	// Calculate the absolute difference in milliseconds
	const differenceInMillis = Math.abs(time2Millis - time1Millis)

	// Convert milliseconds to hours
	const differenceInHours = differenceInMillis / (1000 * 60 * 60)

	// Check if the difference is more than 12 hours
	return differenceInHours > 12
}
