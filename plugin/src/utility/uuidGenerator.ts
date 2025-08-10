export const uuidSize = 8;
function generateUUIDBuffer(): buffer {
	const uuidRandom = new Random();
	const uuidBuffer = buffer.create(uuidSize);
	for (let i = 0; i < uuidSize; i++) {
		const uuidByte = uuidRandom.NextInteger(0, 255);
		buffer.writeu8(uuidBuffer, i, uuidByte);
	}
	return uuidBuffer;
}

function tostringUUIDBuffer(uuidBuffer: buffer): string {
	const uuidFormatString = string.rep("%.2x", uuidSize);
	const uuidBytes: number[] = [];
	for (let i = 0; i < uuidSize; i++) {
		const uuidByte = buffer.readu8(uuidBuffer, i);
		uuidBytes.push(uuidByte);
	}
	return string.format(uuidFormatString, ...uuidBytes);
}

export function newUUID(): string {
	const uuidBuffer = generateUUIDBuffer();
	return tostringUUIDBuffer(uuidBuffer);
}
