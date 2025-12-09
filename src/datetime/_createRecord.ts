/** @internal */
export function createRecord<V>(object: Record<string, V> = {}): Record<string, V> {
	return Object.assign(Object.create(null) as Record<string, V>, object);
}
