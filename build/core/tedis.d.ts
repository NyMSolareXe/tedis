import { Base, BaseParams } from "./base";
export declare class Tedis extends Base {
    constructor(options?: BaseParams);
    /*******************************************************************************************************
     * KEY *************************************************************************************************
     *******************************************************************************************************/
    /**
     * Removes the specified keys. A key is ignored if it does not exist.
     *
     * @param key The first key.
     * @param keys The other key.
     * @returns The number of keys that were removed.
     */
    del(key: string, ...keys: string[]): Promise<number>;
    /**
     * Returns if key exists.
     *
     * Since Redis 3.0.3 it is possible to specify multiple keys instead of a single one. In such a case,
     * it returns the total number of keys existing. Note that returning 1 or 0 for a single key is just
     * a special case of the variadic usage, so the command is completely backward compatible.
     *
     * The user should be aware that if the same existing key is mentioned in the arguments multiple times,
     * it will be counted multiple times. So if somekey exists, EXISTS somekey somekey will return 2.
     *
     * @param key The first key.
     * @param keys The other key.
     * @returns 1 if the key exists. 0 if the key does not exist.
     */
    exists(key: string, ...keys: string[]): Promise<number>;
    /**
     * Set a timeout on key. After the timeout has expired, the key will automatically be deleted. A key
     * with an associated timeout is often said to be volatile in Redis terminology.
     *
     * @param key The key.
     * @param seconds Expiration time in seconds.
     * @returns 1 if the timeout was set. 0 if key does not exist.
     */
    expire(key: string, seconds: number): Promise<number>;
    /**
     * `EXPIREAT` has the same effect and semantic as `EXPIRE`, but instead of specifying the number of
     * seconds representing the TTL (time to live), it takes an absolute Unix timestamp (seconds since
     * January 1, 1970). A timestamp in the past will delete the key immediately.
     *
     * Please for the specific semantics of the command refer to the documentation of `EXPIRE`.
     *
     * @param key The key.
     * @param timestamp Expiration time in timestamp.
     * @returns 1 if the timeout was set. 0 if key does not exist.
     */
    expireat(key: string, timestamp: number): Promise<number>;
    /**
     * Returns all keys matching pattern.
     *
     * @param pattern Pattern string.
     * @returns List of keys matching pattern.
     */
    keys(pattern: string): Promise<string[]>;
    /**
     * Move key from the currently selected database (see `SELECT`) to the specified destination database.
     * When key already exists in the destination database, or it does not exist in the source database,
     * it does nothing. It is possible to use `MOVE` as a locking primitive because of this.
     *
     * @param key The key.
     * @param db The specified database number.
     * @returns 1 if key was moved. 0 if key was not moved.
     */
    move(key: string, db: number): Promise<number>;
    /**
     * Remove the existing timeout on key, turning the key from volatile (a key with an expire set) to
     * persistent (a key that will never expire as no timeout is associated).
     *
     * @param key The key.
     * @returns 1 if the timeout was removed. 0 if key does not exist or does not have an associated timeout.
     */
    persist(key: string): Promise<number>;
    /**
     * This command works exactly like EXPIRE but the time to live of the key is specified in milliseconds
     * instead of seconds.
     *
     * @param key The key.
     * @param milliseconds Expiration time in milliseconds.
     * @returns 1 if the timeout was set. 0 if key does not exist.
     */
    pexpire(key: string, milliseconds: number): Promise<number>;
    /**
     * `PEXPIREAT` has the same effect and semantic as `EXPIREAT`, but the Unix time at which the key will
     * expire is specified in milliseconds instead of seconds.
     *
     * @param key The key.
     * @param millisecondsTimestamp Expiration time in millisecondsTimestamp.
     * @returns 1 if the timeout was set. 0 if key does not exist.
     */
    pexpireat(key: string, millisecondsTimestamp: number): Promise<number>;
    /**
     * Like `TTL` this command returns the remaining time to live of a key that has an expire set, with the
     * sole difference that `TTL` returns the amount of remaining time in seconds while `PTTL` returns it in
     * milliseconds.
     *
     * @param key The key.
     * @returns `TTL` in milliseconds, or a negative value in order to signal an error (see the description
     * above). The command returns -2 if the key does not exist. The command returns -1 if the key exists
     * but has no associated expire.
     */
    pttl(key: string): Promise<number>;
    /**
     * Return a random key from the currently selected database.
     *
     * @returns The random key, or nil when the database is empty.
     */
    randomkey(): Promise<string | null>;
    /**
     * Renames key to newkey. It returns an error when key does not exist. If newkey already exists it is
     * overwritten, when this happens `RENAME` executes an implicit DEL operation, so if the deleted key
     * contains a very big value it may cause high latency even if `RENAME` itself is usually a constant-time
     * operation.
     *
     * Note: Before Redis 3.2.0, an error is returned if source and destination names are the same.
     *
     * @param key The key.
     * @param newKey The newKey.
     * @returns "OK".
     */
    rename(key: string, newKey: string): Promise<string>;
    /**
     * Renames key to newkey if newkey does not yet exist. It returns an error when key does not exist.
     *
     * Note: Before Redis 3.2.0, an error is returned if source and destination names are the same.
     *
     * @param key The key.
     * @param newKey The newKey.
     * @returns 1 if key was renamed to newkey. 0 if newkey already exists.
     */
    renamenx(key: string, newKey: string): Promise<0 | 1>;
    /**
     * Returns the remaining time to live of a key that has a timeout. This introspection capability allows
     * a Redis client to check how many seconds a given key will continue to be part of the dataset.
     *
     * In Redis 2.6 or older the command returns -1 if the key does not exist or if the key exist but has
     * no associated expire.
     *
     * Starting with Redis 2.8 the return value in case of error changed:
     * - The command returns -2 if the key does not exist.
     * - The command returns -1 if the key exists but has no associated expire.
     *
     * See also the `PTTL` command that returns the same information with milliseconds resolution (Only
     * available in Redis 2.6 or greater).
     *
     * @param key The key.
     * @returns TTL in seconds, or a negative value in order to signal an error (see the description above).
     */
    ttl(key: string): Promise<number>;
    /**
     * Returns the string representation of the type of the value stored at key. The different types that
     * can be returned are: string, list, set, zset and hash.
     *
     * @param key The key.
     * @returns Type of key(string, hash, list, set, zset), or none when key does not exist.
     */
    type(key: string): Promise<string>;
    /*******************************************************************************************************
     * STRING **********************************************************************************************
     *******************************************************************************************************/
    /**
     * If key already exists and is a string, this command appends the value at the end of the string. If
     * key does not exist it is created and set as an empty string, so `APPEND` will be similar to SET in
     * this special case.
     *
     * @param key The key.
     * @param value The value.
     * @returns The length of the string after the append operation.
     */
    append(key: string, value: string): Promise<number>;
    /**
     * Decrements the number stored at key by one. If the key does not exist, it is set to 0 before performing
     * the operation. An error is returned if the key contains a value of the wrong type or contains a string
     * that can not be represented as integer. This operation is limited to 64 bit signed integers.
     *
     * @param key The key.
     * @returns The value of key after the decrement.
     */
    decr(key: string): Promise<number>;
    /**
     * Decrements the number stored at key by decrement. If the key does not exist, it is set to 0 before
     * performing the operation. An error is returned if the key contains a value of the wrong type or
     * contains a string that can not be represented as integer. This operation is limited to 64 bit
     * signed integers.
     *
     * @param key The key.
     * @param increment The increment.
     * @returns The value of key after the decrement.
     */
    decrby(key: string, increment: number): Promise<number>;
    /**
     * Get the value of key. If the key does not exist the special value nil is returned. An error is returned
     * if the value stored at key is not a string, because `GET` only handles string values.
     *
     * @param key The key.
     * @returns The value of key, or nil when key does not exist.
     */
    get(key: string): Promise<string | number | null>;
    /**
     * Returns the bit value at offset in the string value stored at key.
     *
     * When offset is beyond the string length, the string is assumed to be a contiguous space with 0 bits.
     * When key does not exist it is assumed to be an empty string, so offset is always out of range and
     * the value is also assumed to be a contiguous space with 0 bits.
     *
     * @param key The key.
     * @param offset The offset.
     * @returns The bit value stored at offset.
     */
    getbit(key: string, offset: number): Promise<0 | 1>;
    /**
     * Returns the substring of the string value stored at key, determined by the offsets start and end
     * (both are inclusive). Negative offsets can be used in order to provide an offset starting from
     * the end of the string. So -1 means the last character, -2 the penultimate and so forth.
     *
     * The function handles out of range requests by limiting the resulting range to the actual length
     * of the string.
     *
     * @param key The key.
     * @param range The range. Start is the start position, and end is the end position
     * @returns Substring.
     */
    getrange(key: string, [start, end]?: [number, number]): Promise<string>;
    /**
     * Atomically sets key to value and returns the old value stored at key. Returns an error when key
     * exists but does not hold a string value.
     *
     * @param key The key.
     * @param value The value.
     * @returns The old value stored at key, or nil when key did not exist.
     */
    getset(key: string, value: string): Promise<string | null>;
    /**
     * Increments the number stored at key by one. If the key does not exist, it is set to 0 before
     * performing the operation. An error is returned if the key contains a value of the wrong type
     * or contains a string that can not be represented as integer. This operation is limited to 64
     * bit signed integers.
     *
     *
     * Note: this is a string operation because Redis does not have a dedicated integer type. The
     * string stored at the key is interpreted as a base-10 64 bit signed integer to execute the
     * operation.
     *
     * Redis stores integers in their integer representation, so for string values that actually
     * hold an integer, there is no overhead for storing the string representation of the integer.
     *
     * @param key The key.
     * @returns the value of key after the increment.
     */
    incr(key: string): Promise<number>;
    /**
     * Increments the number stored at key by increment. If the key does not exist, it is set to 0 before
     * performing the operation. An error is returned if the key contains a value of the wrong type or
     * contains a string that can not be represented as integer. This operation is limited to 64 bit signed
     * integers.
     *
     * @param key The key.
     * @param increment The increment.
     * @returns The value of key after the increment.
     */
    incrby(key: string, increment: number): Promise<number>;
    /**
     * Increment the string representing a floating point number stored at key by the specified increment.
     * By using a negative increment value, the result is that the value stored at the key is decremented
     * (by the obvious properties of addition). If the key does not exist, it is set to 0 before performing
     * the operation. An error is returned if one of the following conditions occur:
     * - The key contains a value of the wrong type (not a string).
     * - The current key content or the specified increment are not parsable as a double precision floating
     * point number.
     *
     * If the command is successful the new incremented value is stored as the new value of the key (replacing
     * the old one), and returned to the caller as a string.
     *
     * @param key The key.
     * @param increment The increment.
     * @returns The value of key after the increment.
     */
    incrbyfloat(key: string, increment: number): Promise<string>;
    /**
     * Returns the values of all specified keys. For every key that does not hold a string value or does not
     * exist, the special value nil is returned. Because of this, the operation never fails.
     *
     * @param key The key.
     * @param keys The other key.
     * @returns List of values at the specified keys.
     */
    mget(key: string, ...keys: string[]): Promise<(string | number | null)[]>;
    /**
     * Sets the given keys to their respective values. `MSET` replaces existing values with new values, just
     * as regular `SET`. See `MSETNX` if you don't want to overwrite existing values.
     *
     * `MSET` is atomic, so all given keys are set at once. It is not possible for clients to see that some
     * of the keys were updated while others are unchanged.
     *
     * @param objKV The objects that need to be saved
     * @returns Always OK since `MSET` can't fail.
     */
    mset(objKV: {
        [propName: string]: string;
    }): Promise<string>;
    /**
     * Sets the given keys to their respective values. `MSETNX` will not perform any operation at all even
     * if just a single key already exists.
     *
     * Because of this semantic `MSETNX` can be used in order to set different keys representing different
     * fields of an unique logic object in a way that ensures that either all the fields or none at all are
     * set.
     *
     * `MSETNX` is atomic, so all given keys are set at once. It is not possible for clients to see that
     * some of the keys were updated while others are unchanged.
     *
     * @param objKv The objects that need to be saved
     * @returns 1 if the all the keys were set. 0 if no key was set (at least one key already existed).
     */
    msetnx(objKv: {
        [propName: string]: string;
    }): Promise<number>;
    /**
     * `PSETEX` works exactly like `SETEX` with the sole difference that the expire time is specified in
     * milliseconds instead of seconds.
     *
     * @param key The key.
     * @param milliseconds Expiration time in milliseconds.
     * @param value The value.
     * @returns "OK".
     */
    psetex(key: string, milliseconds: number, value: string): Promise<string>;
    /**
     * Set key to hold the string value. If key already holds a value, it is overwritten, regardless of
     * its type. Any previous time to live associated with the key is discarded on successful SET operation.
     *
     * Options Starting with Redis 2.6.12 SET supports a set of options that modify its behavior:
     * - EX seconds -- Set the specified expire time, in seconds.
     * - PX milliseconds -- Set the specified expire time, in milliseconds.
     * - NX -- Only set the key if it does not already exist.
     * - XX -- Only set the key if it already exist.
     *
     * @param key The key.
     * @param value The value.
     * @returns OK if `SET` was executed correctly. Null reply: a Null Bulk Reply is returned if the `SET`
     * operation was not performed because the user specified the NX or XX option but the condition was
     * not met.
     */
    set(key: string, value: string): Promise<string>;
    /**
     * Sets or clears the bit at offset in the string value stored at key.
     *
     * The bit is either set or cleared depending on value, which can be either 0 or 1. When key does not
     * exist, a new string value is created. The string is grown to make sure it can hold a bit at offset.
     * The offset argument is required to be greater than or equal to 0, and smaller than 2^32 (this limits
     * bitmaps to 512MB). When the string at key is grown, added bits are set to 0.
     *
     * @param key The key.
     * @param offset The offset
     * @param value The value.
     * @returns The original bit value stored at offset.
     */
    setbit(key: string, offset: number, value: 0 | 1): Promise<0 | 1>;
    /**
     * Set key to hold the string value and set key to timeout after a given number of seconds.
     *
     * @param key The key.
     * @param seconds Expiration time in seconds.
     * @param value The value.
     * @returns "OK".
     */
    setex(key: string, seconds: number, value: string): Promise<string>;
    /**
     * Set key to hold string value if key does not exist. In that case, it is equal to `SET`. When key already
     * holds a value, no operation is performed. `SETNX` is short for "SET if Not eXists".
     *
     * @param key The key.
     * @param keys The other key.
     * @returns 1 if the key was set, 0 if the key was not set.
     */
    setnx(key: string, ...keys: string[]): Promise<0 | 1>;
    /**
     * Overwrites part of the string stored at key, starting at the specified offset, for the entire length of
     * value. If the offset is larger than the current length of the string at key, the string is padded with
     * zero-bytes to make offset fit. Non-existing keys are considered as empty strings, so this command will
     * make sure it holds a string large enough to be able to set value at offset.
     *
     * @param key The key.
     * @param offset The offset.
     * @param value The value.
     * @returns The length of the string after it was modified by the command.
     */
    setrange(key: string, offset: number, value: string): Promise<number>;
    /**
     * Returns the length of the string value stored at key. An error is returned when key holds a non-string value.
     *
     * @param key The key.
     * @returns The length of the string at key, or 0 when key does not exist.
     */
    strlen(key: string): Promise<number>;
    /*******************************************************************************************************
     * HASH ************************************************************************************************
     *******************************************************************************************************/
    /**
     * Removes the specified fields from the hash stored at key. Specified fields that do not exist within
     * this hash are ignored. If key does not exist, it is treated as an empty hash and this command returns 0.
     *
     * @param key The key.
     * @param field The field.
     * @param fields The other field.
     * @returns The number of fields that were removed from the hash, not including specified but non existing
     * fields.
     */
    hdel(key: string, field: string, ...fields: string[]): Promise<number>;
    /**
     * Returns if field is an existing field in the hash stored at key.
     * @param key The key.
     * @param field The field.
     * @returns 1 if the hash contains field. 0 if the hash does not contain field, or key does not exist.
     */
    hexists(key: string, field: string): Promise<number>;
    /**
     * Returns the value associated with field in the hash stored at key.
     *
     * @param key The key.
     * @param field The field.
     * @returns The value associated with field, or nil when field is not present in the hash or key does not exist.
     */
    hget(key: string, field: string): Promise<string | null>;
    /**
     * Returns all fields and values of the hash stored at key. In the returned value, every field name is followed
     * by its value, so the length of the reply is twice the size of the hash.
     *
     * @param key The key.
     * @returns List of fields and their values stored in the hash, or an empty list when key does not exist.
     */
    hgetall(key: string): Promise<{
        [propName: string]: string;
    }>;
    /**
     * Increments the number stored at field in the hash stored at key by increment. If key does not exist, a new
     * key holding a hash is created. If field does not exist the value is set to 0 before the operation is performed.
     *
     * The range of values supported by `HINCRBY` is limited to 64 bit signed integers.
     *
     * @param key The key.
     * @param field The field.
     * @param increment The increment.
     * @returns The value at field after the increment.
     */
    hincrby(key: string, field: string, increment: number): Promise<number>;
    /**
     * Increment the specified field of a hash stored at key, and representing a floating point number, by the
     * specified increment. If the increment value is negative, the result is to have the hash field value
     * decremented instead of incremented. If the field does not exist, it is set to 0 before performing the
     * operation. An error is returned if one of the following conditions occur:
     * - The field contains a value of the wrong type (not a string).
     * - The current field content or the specified increment are not parsable as a double precision floating point number.
     *
     * @param key The key.
     * @param field The field.
     * @param increment The increment.
     * @returns The value at field after the increment.
     */
    hincrbyfloat(key: string, field: string, increment: number): Promise<string>;
    /**
     * Returns all field names in the hash stored at key.
     *
     * @param key The key.
     * @returns List of fields in the hash, or an empty list when key does not exist.
     */
    hkeys(key: string): Promise<string[]>;
    /**
     * Returns the number of fields contained in the hash stored at key.
     * @param key The key.
     * @returns Number of fields in the hash, or 0 when key does not exist.
     */
    hlen(key: string): Promise<number>;
    /**
     * Returns the values associated with the specified fields in the hash stored at key.
     *
     * For every field that does not exist in the hash, a nil value is returned. Because non-existing keys are
     * treated as empty hashes, running HMGET against a non-existing key will return a list of nil values.
     *
     * @param key The key.
     * @param field The field.
     * @param fields The other field.
     * @returns List of values associated with the given fields, in the same order as they are requested.
     */
    hmget(key: string, field: string, ...fields: string[]): Promise<(string | null)[]>;
    /**
     * Sets the specified fields to their respective values in the hash stored at key. This command overwrites
     * any specified fields already existing in the hash. If key does not exist, a new key holding a hash is
     * created.
     *
     * @param key The key.
     * @param data The data.
     * @returns "OK".
     */
    hmset(key: string, data: {
        [propName: string]: string | number;
    }): Promise<unknown>;
    /**
     * Sets field in the hash stored at key to value. If key does not exist, a new key holding a hash is created.
     * If field already exists in the hash, it is overwritten.
     *
     * @param key The key.
     * @param field The field.
     * @param value The value.
     * @returns 1 if field is a new field in the hash and value was set. 0 if field already exists in the hash
     * and the value was updated.
     */
    hset(key: string, field: string, value: string): Promise<0 | 1>;
    /**
     * Sets field in the hash stored at key to value, only if field does not yet exist. If key does not exist,
     * a new key holding a hash is created. If field already exists, this operation has no effect.
     *
     * @param key The key.
     * @param field The field.
     * @param value The value.
     * @returns 1 if field is a new field in the hash and value was set. 0 if field already exists in the hash
     * and no operation was performed.
     */
    hsetnx(key: string, field: string, value: string): Promise<0 | 1>;
    /**
     * Returns the string length of the value associated with field in the hash stored at key. If the key or the
     * field do not exist, 0 is returned.
     *
     * @param key The key.
     * @param field The field.
     * @returns The string length of the value associated with field, or zero when field is not present in the
     * hash or key does not exist at all.
     */
    hstrlen(key: string, field: string): Promise<number>;
    /**
     * Returns all values in the hash stored at key.
     * @param key The key.
     * @returns List of values in the hash, or an empty list when key does not exist.
     */
    hvals(key: string): Promise<string[]>;
    /*******************************************************************************************************
     * LIST ************************************************************************************************
     *******************************************************************************************************/
    /**
     * BLPOP is a blocking list pop primitive. It is the blocking version of LPOP because it blocks the
     * connection when there are no elements to pop from any of the given lists. An element is popped from
     * the head of the first list that is non-empty, with the given keys being checked in the order that
     * they are given.
     *
     * @param timeout The timeout.
     * @param keys The keys.
     * @returns
     * - A nil multi-bulk when no element could be popped and the timeout expired.
     * - A two-element multi-bulk with the first element being the name of the key where an element was
     * popped and the second element being the value of the popped element.
     */
    blpop(timeout: number, ...keys: string[]): Promise<(string | null)[]>;
    /**
     * BRPOP is a blocking list pop primitive. It is the blocking version of RPOP because it blocks the
     * connection when there are no elements to pop from any of the given lists. An element is popped
     * from the tail of the first list that is non-empty, with the given keys being checked in the order
     * that they are given.
     *
     * @param timeout The timeout.
     * @param keys The keys.
     * @returns
     * - A nil multi-bulk when no element could be popped and the timeout expired.
     * - A two-element multi-bulk with the first element being the name of the key where an element was
     * popped and the second element being the value of the popped element.
     */
    brpop(timeout: number, ...keys: string[]): Promise<(string | null)[]>;
    /**
     * BRPOPLPUSH is the blocking variant of RPOPLPUSH. When source contains elements, this command behaves
     * exactly like RPOPLPUSH. When used inside a MULTI/EXEC block, this command behaves exactly like
     * RPOPLPUSH. When source is empty, Redis will block the connection until another client pushes to it
     * or until timeout is reached. A timeout of zero can be used to block indefinitely.
     *
     * @param source The source.
     * @param destination The destination.
     * @param timeout The timeout.
     * @returns The element being popped from source and pushed to destination. If timeout is reached, a
     * Null reply is returned.
     */
    brpoplpush(source: string, destination: string, timeout: number): Promise<unknown>;
    /**
     * Returns the element at index index in the list stored at key. The index is zero-based, so 0 means
     * the first element, 1 the second element and so on. Negative indices can be used to designate elements
     * starting at the tail of the list. Here, -1 means the last element, -2 means the penultimate and so
     * forth.
     *
     * When the value at key is not a list, an error is returned.
     *
     * @param key The key.
     * @param index The index.
     * @returns The requested element, or nil when index is out of range.
     */
    lindex(key: string, index: number): Promise<unknown>;
    /**
     * Inserts value in the list stored at key either before or after the reference value pivot.
     *
     * When key does not exist, it is considered an empty list and no operation is performed.
     *
     * An error is returned when key exists but does not hold a list value.
     *
     * @param key The key.
     * @param type The type.
     * @param pivot The pivot.
     * @param value The value.
     * @returns the length of the list after the insert operation, or -1 when the value pivot was not found.
     */
    linsert(key: string, type: "BEFORE" | "AFTER", pivot: string, value: string): Promise<number>;
    /**
     * Returns the length of the list stored at key. If key does not exist, it is interpreted as an empty
     * list and 0 is returned. An error is returned when the value stored at key is not a list.
     *
     * @param key The key.
     * @returns The length of the list at key.
     */
    llen(key: string): Promise<number>;
    /**
     * Removes and returns the first element of the list stored at key.
     *
     * @param key The key.
     * @returns The value of the first element, or nil when key does not exist.
     */
    lpop(key: string): Promise<string | null>;
    /**
     * Insert all the specified values at the head of the list stored at key. If key does not exist, it is
     * created as empty list before performing the push operations. When key holds a value that is not a list,
     * an error is returned.
     *
     * It is possible to push multiple elements using a single command call just specifying multiple arguments
     * at the end of the command. Elements are inserted one after the other to the head of the list, from the
     * leftmost element to the rightmost element. So for instance the command LPUSH mylist a b c will result
     * into a list containing c as first element, b as second element and a as third element.
     *
     * @param key The key.
     * @param value The value.
     * @param values The other value.
     * @returns The length of the list after the push operations.
     */
    lpush(key: string, value: string | number, ...values: Array<string | number>): Promise<number>;
    /**
     * Inserts value at the head of the list stored at key, only if key already exists and holds a list. In
     * contrary to LPUSH, no operation will be performed when key does not yet exist.
     *
     * @param key The key.
     * @param value The value.
     * @returns The length of the list after the push operation.
     */
    lpushx(key: string, value: string | number): Promise<number>;
    /**
     * Returns the specified elements of the list stored at key. The offsets start and stop are zero-based
     * indexes, with 0 being the first element of the list (the head of the list), 1 being the next element
     * and so on.
     *
     * These offsets can also be negative numbers indicating offsets starting at the end of the list. For
     * example, -1 is the last element of the list, -2 the penultimate, and so on.
     *
     * ### Consistency with range functions in various programming languages
     * Note that if you have a list of numbers from 0 to 100, LRANGE list 0 10 will return 11 elements,
     * that is, the rightmost item is included. This may or may not be consistent with behavior of
     * range-related functions in your programming language of choice (think Ruby's Range.new, Array#slice
     * or Python's range() function).
     *
     * ### Out-of-range indexes
     * Out of range indexes will not produce an error. If start is larger than the end of the list, an empty
     * list is returned. If stop is larger than the actual end of the list, Redis will treat it like the
     * last element of the list.
     *
     * @param key The key.
     * @param start The start.
     * @param stop The stop.
     * @returns List of elements in the specified range.
     */
    lrange(key: string, start: number, stop: number): Promise<string[]>;
    /**
     * Removes the first count occurrences of elements equal to value from the list stored at key. The count
     * argument influences the operation in the following ways:
     * - count > 0: Remove elements equal to value moving from head to tail.
     * - count < 0: Remove elements equal to value moving from tail to head.
     * - count = 0: Remove all elements equal to value.
     *
     * For example, LREM list -2 "hello" will remove the last two occurrences of "hello" in the list stored
     * at list.
     *
     * Note that non-existing keys are treated like empty lists, so when key does not exist, the command will
     * always return 0.
     *
     * @param key The key.
     * @param count The count.
     * @param value The value.
     * @returns The number of removed elements.
     */
    lrem(key: string, count: number, value: string): Promise<number>;
    /**
     * Sets the list element at index to value. For more information on the index argument, see LINDEX.
     *
     * An error is returned for out of range indexes.
     *
     * @param key The key.
     * @param count The count.
     * @param value The value.
     * @returns "OK".
     */
    lset(key: string, index: number, value: string): Promise<unknown>;
    /**
     * Trim an existing list so that it will contain only the specified range of elements specified. Both
     * start and stop are zero-based indexes, where 0 is the first element of the list (the head), 1 the
     * next element and so on.
     *
     * For example: LTRIM foobar 0 2 will modify the list stored at foobar so that only the first three
     * elements of the list will remain.
     *
     * start and end can also be negative numbers indicating offsets from the end of the list, where -1
     * is the last element of the list, -2 the penultimate element and so on.
     *
     * Out of range indexes will not produce an error: if start is larger than the end of the list, or
     * start > end, the result will be an empty list (which causes key to be removed). If end is larger
     * than the end of the list, Redis will treat it like the last element of the list.
     *
     * A common use of LTRIM is together with LPUSH / RPUSH. For example:
     * ```bash
     * LPUSH mylist someelement
     * LTRIM mylist 0 99
     * ```
     *
     * This pair of commands will push a new element on the list, while making sure that the list will
     * not grow larger than 100 elements. This is very useful when using Redis to store logs for example.
     * It is important to note that when used in this way LTRIM is an O(1) operation because in the
     * average case just one element is removed from the tail of the list.
     *
     * @param key The key.
     * @param start The start.
     * @param stop The stop.
     * @returns "OK".
     */
    ltrim(key: string, start: number, stop: number): Promise<unknown>;
    /**
     * Removes and returns the last element of the list stored at key.
     * @param key The key.
     * @returns The value of the last element, or nil when key does not exist.
     */
    rpop(key: string): Promise<string | null>;
    /**
     * Atomically returns and removes the last element (tail) of the list stored at source, and pushes
     * the element at the first element (head) of the list stored at destination.
     *
     * For example: consider source holding the list a,b,c, and destination holding the list x,y,z.
     * Executing RPOPLPUSH results in source holding a,b and destination holding c,x,y,z.
     *
     * If source does not exist, the value nil is returned and no operation is performed. If source and
     * destination are the same, the operation is equivalent to removing the last element from the list
     * and pushing it as first element of the list, so it can be considered as a list rotation command.
     *
     * @param source The source.
     * @param destination The destination.
     * @returns The element being popped and pushed.
     */
    rpoplpush(source: string, destination: string): Promise<string | null>;
    /**
     * Insert all the specified values at the tail of the list stored at key. If key does not exist,
     * it is created as empty list before performing the push operation. When key holds a value that
     * is not a list, an error is returned.
     *
     * It is possible to push multiple elements using a single command call just specifying multiple
     * arguments at the end of the command. Elements are inserted one after the other to the tail of
     * the list, from the leftmost element to the rightmost element. So for instance the command RPUSH
     * mylist a b c will result into a list containing a as first element, b as second element and c
     * as third element.
     *
     * @param key The key.
     * @param value The value.
     * @param values The other value.
     * @returns The length of the list after the push operation.
     */
    rpush(key: string, value: string | number, ...values: Array<string | number>): Promise<number>;
    /**
     * Inserts value at the tail of the list stored at key, only if key already exists and holds a list.
     * In contrary to RPUSH, no operation will be performed when key does not yet exist.
     *
     * @param key The key.
     * @param value The value.
     * @returns The length of the list after the push operation.
     */
    rpushx(key: string, value: string | number): Promise<number>;
    /*******************************************************************************************************
     * SET *************************************************************************************************
     *******************************************************************************************************/
    /**
     * Add the specified members to the set stored at key. Specified members that are already a member of
     * this set are ignored. If key does not exist, a new set is created before adding the specified members.
     *
     * An error is returned when the value stored at key is not a set.
     *
     * @param key The key.
     * @param member The member.
     * @param members The other member.
     * @returns The number of elements that were added to the set, not including all the elements already
     * present into the set.
     */
    sadd(key: string, member: string | number, ...members: Array<string | number>): Promise<number>;
    /**
     * Returns the set cardinality (number of elements) of the set stored at key.
     *
     * @param key The key.
     * @returns The cardinality (number of elements) of the set, or 0 if key does not exist.
     */
    scard(key: string): Promise<number>;
    /**
     * Returns the members of the set resulting from the difference between the first set and all the
     * successive sets. Keys that do not exist are considered to be empty sets.
     *
     * @param key The key.
     * @param anotherkey The anotherkey.
     * @param keys The keys.
     * @returns List with members of the resulting set.
     */
    sdiff(key: string, anotherkey: string, ...keys: string[]): Promise<string[]>;
    /**
     * This command is equal to SDIFF, but instead of returning the resulting set, it is stored in destination.
     *
     * If destination already exists, it is overwritten.
     *
     * @param destination The destination.
     * @param key The key.
     * @param anotherkey The anotherkey.
     * @param keys The keys.
     * @returns The number of elements in the resulting set.
     */
    sdiffstore(destination: string, key: string, anotherkey: string, ...keys: string[]): Promise<number>;
    /**
     * Returns the members of the set resulting from the intersection of all the given sets.
     *
     * Keys that do not exist are considered to be empty sets. With one of the keys being an empty set,
     * the resulting set is also empty (since set intersection with an empty set always results in an
     * empty set).
     *
     * @param key The key.
     * @param anotherkey The anotherkey.
     * @param keys The keys.
     * @returns List with members of the resulting set.
     */
    sinter(key: string, anotherkey: string, ...keys: string[]): Promise<string[]>;
    /**
     * This command is equal to SINTER, but instead of returning the resulting set, it is stored in destination.
     *
     * If destination already exists, it is overwritten.
     *
     * @param destination The destination.
     * @param key The key.
     * @param anotherkey The anotherkey.
     * @param keys The keys.
     * @returns The number of elements in the resulting set.
     */
    sinterstore(destination: string, key: string, anotherkey: string, ...keys: string[]): Promise<number>;
    /**
     * Returns if member is a member of the set stored at key.
     *
     * @param key The key.
     * @param member The member.
     * @returns 1 if the element is a member of the set. 0 if the element is not a member of the set, or if key
     * does not exist.
     */
    sismember(key: string, member: string | number): Promise<number>;
    /**
     * Returns all the members of the set value stored at key.
     *
     * This has the same effect as running SINTER with one argument key.
     *
     * @param key The key.
     * @returns All elements of the set.
     */
    smembers(key: string): Promise<string[]>;
    /**
     * Move member from the set at source to the set at destination. This operation is atomic. In every given
     * moment the element will appear to be a member of source or destination for other clients.
     *
     * If the source set does not exist or does not contain the specified element, no operation is performed
     * and 0 is returned. Otherwise, the element is removed from the source set and added to the destination
     * set. When the specified element already exists in the destination set, it is only removed from the
     * source set.
     *
     * An error is returned if source or destination does not hold a set value.
     *
     * @param source The source.
     * @param destination The destination.
     * @param member The member.
     * @returns 1 if the element is moved. 0 if the element is not a member of source and no operation was
     * performed.
     */
    smove(source: string, destination: string, member: string): Promise<number>;
    /**
     * Removes and returns one or more random elements from the set value store at key.
     * @param key The key.
     * @param count The count.
     * @returns The removed element, or nil when key does not exist.
     */
    spop(key: string, count: number): Promise<string[]>;
    /**
     * Removes and returns one or more random elements from the set value store at key.
     * @param key The key.
     * @param count The count.
     * @returns The removed element, or nil when key does not exist.
     */
    spop(key: string): Promise<string | null>;
    /**
     * When called with just the key argument, return a random element from the set value stored at key.
     * @param key The key.
     * @param count The count.
     */
    srandmember(key: string, count: number): Promise<string[]>;
    /**
     * When called with just the key argument, return a random element from the set value stored at key.
     * @param key The key.
     */
    srandmember(key: string): Promise<string | null>;
    /**
     * Remove the specified members from the set stored at key. Specified members that are not a member
     * of this set are ignored. If key does not exist, it is treated as an empty set and this command
     * returns 0.
     *
     * An error is returned when the value stored at key is not a set.
     *
     * @param key The key.
     * @param member The member.
     * @param members The other member.
     * @returns The number of members that were removed from the set, not including non existing members.
     */
    srem(key: string, member: string | number, ...members: Array<string | number>): Promise<number>;
    /**
     * Returns the members of the set resulting from the union of all the given sets. Keys that do not
     * exist are considered to be empty sets.
     *
     * @param key The key.
     * @param anotherkey The anotherkey.
     * @param keys The other key.
     * @returns List with members of the resulting set.
     */
    sunion(key: string, anotherkey: string, ...keys: string[]): Promise<string[]>;
    /**
     * This command is equal to SUNION, but instead of returning the resulting set, it is stored in destination.
     *
     * If destination already exists, it is overwritten.
     *
     * @param destination The destination.
     * @param key The key.
     * @param anotherkey The anotherkey.
     * @param keys The keys.
     * @returns The number of elements in the resulting set.
     */
    sunionstore(destination: string, key: string, anotherkey: string, ...keys: string[]): Promise<number>;
    /*******************************************************************************************************
     * ZSET ************************************************************************************************
     *******************************************************************************************************/
    /**
     * Adds all the specified members with the specified scores to the sorted set stored at key. It is
     * possible to specify multiple score / member pairs. If a specified member is already a member of the
     * sorted set, the score is updated and the element reinserted at the right position to ensure the
     * correct ordering.
     *
     * If key does not exist, a new sorted set with the specified members as sole members is created,
     * like if the sorted set was empty. If the key exists but does not hold a sorted set, an error
     * is returned.
     *
     * @param key The key.
     * @param objMS The objMS.
     * @param options The options.
     * @returns
     * - The number of elements added to the sorted sets, not including elements already existing for which
     * the score was updated. If the INCR option is specified, the return value will be Bulk string reply
     * - the new score of member (a double precision floating point number), represented as string.
     */
    zadd(key: string, objMS: {
        [propName: string]: number;
    }, options?: {
        nxxx?: "NX" | "XX";
        ch?: "CH";
    }): Promise<number>;
    zadd(key: string, objMS: {
        [propName: string]: number;
    }, options?: {
        nxxx?: "NX" | "XX";
        ch?: "CH";
        incr?: "INCR";
    }): Promise<string | null>;
    /**
     * Returns the sorted set cardinality (number of elements) of the sorted set stored at key.
     *
     * @param key The key.
     * @returns The cardinality (number of elements) of the sorted set, or 0 if key does not exist.
     */
    zcard(key: string): Promise<number>;
    /**
     * Returns the number of elements in the sorted set at key with a score between min and max.
     * @param key The key.
     * @param min The min.
     * @param max The max.
     * @returns The number of elements in the specified score range.
     */
    zcount(key: string, min: string, max: string): Promise<number>;
    /**
     * Increments the score of member in the sorted set stored at key by increment. If member does not
     * exist in the sorted set, it is added with increment as its score (as if its previous score was
     * 0.0). If key does not exist, a new sorted set with the specified member as its sole member is
     * created.
     *
     * An error is returned when key exists but does not hold a sorted set.
     *
     * The score value should be the string representation of a numeric value, and accepts double
     * precision floating point numbers. It is possible to provide a negative value to decrement
     * the score.
     *
     * @param key The key.
     * @param increment The increment.
     * @param member The member.
     * @returns The new score of member (a double precision floating point number), represented as string.
     */
    zincrby(key: string, increment: number, member: string): Promise<string>;
    /**
     * Computes the intersection of numkeys sorted sets given by the specified keys, and stores the result
     * in destination. It is mandatory to provide the number of input keys (numkeys) before passing the
     * input keys and the other (optional) arguments.
     *
     * By default, the resulting score of an element is the sum of its scores in the sorted sets where it
     * exists. Because intersection requires an element to be a member of every given sorted set, this
     * results in the score of every element in the resulting sorted set to be equal to the number of
     * input sorted sets.
     *
     * If destination already exists, it is overwritten.
     *
     * @param destination The destination.
     * @param objectKW The objectKW.
     * @param aggregate The aggregate.
     * @returns The number of elements in the resulting sorted set at destination.
     */
    zinterstore(destination: string, objectKW: {
        [PropName: string]: number;
    }, aggregate?: "SUM" | "MIN" | "MAX"): Promise<number>;
    /**
     * this command returns the number of elements in the sorted set at key with a value between min and max.
  #
  
     * @param key The key.
     * @param min The min.
     * @param max The max.
     * @returns The number of elements in the specified score range.
     */
    zlexcount(key: string, min: string, max: string): Promise<number>;
    zrange(key: string, start: number, stop: number): Promise<string[]>;
    zrange(key: string, start: number, stop: number, withscores: "WITHSCORES"): Promise<{
        [propName: string]: string;
    }>;
    /**
     * When all the elements in a sorted set are inserted with the same score, in order to force
     * lexicographical ordering, this command returns all the elements in the sorted set at key
     * with a value between min and max.
     *
     * If the elements in the sorted set have different scores, the returned elements are unspecified.
     *
     * @param key The key.
     * @param min The min.
     * @param max The max.
     * @param options The options.
     * @returns List of elements in the specified score range.
     */
    zrangebylex(key: string, min: string, max: string, options?: {
        offset: number;
        count: number;
    }): Promise<string[]>;
    /**
     * Returns all the elements in the sorted set at key with a score between min and max (including elements
     * with score equal to min or max). The elements are considered to be ordered from low to high scores.
     *
     * The elements having the same score are returned in lexicographical order (this follows from a property
     * of the sorted set implementation in Redis and does not involve further computation).
     *
     * @param key The key.
     * @param min The min.
     * @param max The max.
     * @param options The options.
     * @returns List of elements in the specified score range (optionally with their scores).
     */
    zrangebyscore(key: string, min: string, max: string, options?: {
        limit?: {
            offset: number;
            count: number;
        };
    }): Promise<string[]>;
    zrangebyscore(key: string, min: string, max: string, options?: {
        limit?: {
            offset: number;
            count: number;
        };
        withscores: "WITHSCORES";
    }): Promise<{
        [propName: string]: string;
    }>;
    /**
     * Returns the rank of member in the sorted set stored at key, with the scores ordered from low
     * to high. The rank (or index) is 0-based, which means that the member with the lowest score
     * has rank 0.
     *
     * @param key The key.
     * @param member The member.
     * @returns
     * - If member exists in the sorted set, Integer reply: the rank of member.
     * - If member does not exist in the sorted set or key does not exist, Bulk string reply: nil.
     */
    zrank(key: string, member: string): Promise<number | null>;
    /**
     * Removes the specified members from the sorted set stored at key. Non existing members are ignored.
     *
     * An error is returned when key exists and does not hold a sorted set.
     *
     * @param key The key.
     * @param member The member.
     * @param members The other member.
     * @returns The number of members removed from the sorted set, not including non existing members.
     */
    zrem(key: string, member: string, ...members: string[]): Promise<number>;
    /**
     * This command removes all elements in the sorted set stored at key between the lexicographical
     * range specified by min and max.
     *
     * @param key The key.
     * @param min The min.
     * @param max The max.
     * @returns The number of elements removed.
     */
    zremrangebylex(key: string, min: string, max: string): Promise<number>;
    /**
     * Removes all elements in the sorted set stored at key with rank between start and stop. Both start
     * and stop are 0 -based indexes with 0 being the element with the lowest score. These indexes can be
     * negative numbers, where they indicate offsets starting at the element with the highest score. For
     * example: -1 is the element with the highest score, -2 the element with the second highest score
     * and so forth.
     *
     * @param key The key.
     * @param start The start.
     * @param stop The stop.
     * @returns The number of elements removed.
     */
    zremrangebyrank(key: string, start: number, stop: number): Promise<unknown>;
    /**
     * Removes all elements in the sorted set stored at key with a score between min and max (inclusive).
     *
     * Since version 2.1.6, min and max can be exclusive
     *
     * @param key The key.
     * @param min The min.
     * @param max The max.
     * @returns The number of elements removed.
     */
    zremrangebyscore(key: string, min: string, max: string): Promise<unknown>;
    /**
     * Returns the specified range of elements in the sorted set stored at key. The elements are considered
     * to be ordered from the highest to the lowest score. Descending lexicographical order is used for
     * elements with equal score.
     *
     * @param key The key.
     * @param start The start.
     * @param stop The stop.
     * @returns List of elements in the specified range (optionally with their scores).
     */
    zrevrange(key: string, start: number, stop: number): Promise<string[]>;
    zrevrange(key: string, start: number, stop: number, withscores: "WITHSCORES"): Promise<{
        [propName: string]: string;
    }>;
    /**
     * Returns all the elements in the sorted set at key with a score between max and min (including elements
     * with score equal to max or min). In contrary to the default ordering of sorted sets, for this command
     * the elements are considered to be ordered from high to low scores.
     *
     * The elements having the same score are returned in reverse lexicographical order.
     *
     * @param key The key.
     * @param max The max.
     * @param min The min.
     * @param options The options.
     * @returns list of elements in the specified score range (optionally with their scores).
     */
    zrevrangebyscore(key: string, max: string, min: string, options?: {
        limit?: {
            offset: number;
            count: number;
        };
    }): Promise<string[]>;
    zrevrangebyscore(key: string, max: string, min: string, options?: {
        limit?: {
            offset: number;
            count: number;
        };
        withscores: "WITHSCORES";
    }): Promise<{
        [propName: string]: string;
    }>;
    /**
     * Returns the rank of member in the sorted set stored at key, with the scores ordered from high to low.
     * The rank (or index) is 0-based, which means that the member with the highest score has rank 0.
     * @param key The key.
     * @param member The member.
     * @returns
     * - If member exists in the sorted set, Integer reply: the rank of member.
     * - If member does not exist in the sorted set or key does not exist, Bulk string reply: nil.
     */
    zrevrank(key: string, member: string): Promise<number | null>;
    /**
     * Returns the score of member in the sorted set at key.
     *
     * If member does not exist in the sorted set, or key does not exist, nil is returned.
     *
     * @param key The key.
     * @param member The member.
     * @returns The score of member (a double precision floating point number), represented as string.
     */
    zscore(key: string, member: string): Promise<string | null>;
    /**
     * Computes the union of numkeys sorted sets given by the specified keys, and stores the result in
     * destination. It is mandatory to provide the number of input keys (numkeys) before passing the
     * input keys and the other (optional) arguments.
     *
     * By default, the resulting score of an element is the sum of its scores in the sorted sets where
     * it exists.
     *
     * @param destination The destination.
     * @param objectKW The objectKW.
     * @param aggregate The aggregate.
     * @returns The number of elements in the resulting sorted set at destination.
     */
    zunionstore(destination: string, objectKW: {
        [PropName: string]: number;
    }, aggregate?: "SUM" | "MIN" | "MAX"): Promise<unknown>;
}
