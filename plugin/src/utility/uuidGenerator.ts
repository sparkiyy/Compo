import { func } from "@rbxts/react/src/prop-types";

function generateUUIDBuffer(): buffer {
	const uuidRandom = new Random();
	const uuidBuffer = buffer.create(8);
	for (let i = 0; i < 8; i++) {
		const uuidByte = uuidRandom.NextInteger(0, 255);
		buffer.writeu8(uuidBuffer, i, uuidByte);
	}
	return uuidBuffer;
}

function tostringUUIDBuffer(uuidBuffer: buffer): string {
	const uuidFormatString = "%.2x%.2x%.2x%.2x%.2x%.2x%.2x%.2x";
	const uuidBytes: number[] = [];
	for (let i = 0; i < 8; i++) {
		const uuidByte = buffer.readu8(uuidBuffer, i);
		uuidBytes.push(uuidByte);
	}
	return string.format(uuidFormatString, ...uuidBytes);
}

export function newUUID(): string {
	const uuidBuffer = generateUUIDBuffer();
	return tostringUUIDBuffer(uuidBuffer);
}