declare function loadstring(source: string): () => unknown;
type Immutable<T> = T extends ImmutablePrimitive
	? T
	: T extends Array<infer U>
		? ImmutableArray<U>
		: T extends Map<infer K, infer V>
			? ImmutableMap<K, V>
			: T extends Set<infer M>
				? ImmutableSet<M>
				: ImmutableObject<T>;

type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;

type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>;
type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };
type ImmutableSet<T> = ReadonlySet<Immutable<T>>;
type ImmutableRecord<K extends string | number | symbol, T> = {
	readonly [P in K]: Immutable<T>;
};

type ImmutablePrimitive = boolean | number | string | undefined;
