"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tedis = void 0;
var base_1 = require("./base");
var tools_1 = require("src/util/tools");
var Tedis = /** @class */ (function (_super) {
    __extends(Tedis, _super);
    function Tedis(options) {
        return _super.call(this, options) || this;
    }
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
    Tedis.prototype.del = function (key) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["DEL", key], __read(keys), false));
    };
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
    Tedis.prototype.exists = function (key) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["EXISTS", key], __read(keys), false));
    };
    /**
     * Set a timeout on key. After the timeout has expired, the key will automatically be deleted. A key
     * with an associated timeout is often said to be volatile in Redis terminology.
     *
     * @param key The key.
     * @param seconds Expiration time in seconds.
     * @returns 1 if the timeout was set. 0 if key does not exist.
     */
    Tedis.prototype.expire = function (key, seconds) {
        return this.command("EXPIRE", key, seconds);
    };
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
    Tedis.prototype.expireat = function (key, timestamp) {
        return this.command("EXPIREAT", key, timestamp);
    };
    /**
     * Returns all keys matching pattern.
     *
     * @param pattern Pattern string.
     * @returns List of keys matching pattern.
     */
    Tedis.prototype.keys = function (pattern) {
        return this.command("KEYS", pattern);
    };
    /**
     * Move key from the currently selected database (see `SELECT`) to the specified destination database.
     * When key already exists in the destination database, or it does not exist in the source database,
     * it does nothing. It is possible to use `MOVE` as a locking primitive because of this.
     *
     * @param key The key.
     * @param db The specified database number.
     * @returns 1 if key was moved. 0 if key was not moved.
     */
    Tedis.prototype.move = function (key, db) {
        return this.command("MOVE", key, db);
    };
    /**
     * Remove the existing timeout on key, turning the key from volatile (a key with an expire set) to
     * persistent (a key that will never expire as no timeout is associated).
     *
     * @param key The key.
     * @returns 1 if the timeout was removed. 0 if key does not exist or does not have an associated timeout.
     */
    Tedis.prototype.persist = function (key) {
        return this.command("PERSIST", key);
    };
    /**
     * This command works exactly like EXPIRE but the time to live of the key is specified in milliseconds
     * instead of seconds.
     *
     * @param key The key.
     * @param milliseconds Expiration time in milliseconds.
     * @returns 1 if the timeout was set. 0 if key does not exist.
     */
    Tedis.prototype.pexpire = function (key, milliseconds) {
        return this.command("PEXPIRE", key, milliseconds);
    };
    /**
     * `PEXPIREAT` has the same effect and semantic as `EXPIREAT`, but the Unix time at which the key will
     * expire is specified in milliseconds instead of seconds.
     *
     * @param key The key.
     * @param millisecondsTimestamp Expiration time in millisecondsTimestamp.
     * @returns 1 if the timeout was set. 0 if key does not exist.
     */
    Tedis.prototype.pexpireat = function (key, millisecondsTimestamp) {
        return this.command("PEXPIREAT", key, millisecondsTimestamp);
    };
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
    Tedis.prototype.pttl = function (key) {
        return this.command("PTTL", key);
    };
    /**
     * Return a random key from the currently selected database.
     *
     * @returns The random key, or nil when the database is empty.
     */
    Tedis.prototype.randomkey = function () {
        return this.command("RANDOMKEY");
    };
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
    Tedis.prototype.rename = function (key, newKey) {
        return this.command("RENAME", key, newKey);
    };
    /**
     * Renames key to newkey if newkey does not yet exist. It returns an error when key does not exist.
     *
     * Note: Before Redis 3.2.0, an error is returned if source and destination names are the same.
     *
     * @param key The key.
     * @param newKey The newKey.
     * @returns 1 if key was renamed to newkey. 0 if newkey already exists.
     */
    Tedis.prototype.renamenx = function (key, newKey) {
        return this.command("RENAMENX", key, newKey);
    };
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
    Tedis.prototype.ttl = function (key) {
        return this.command("TTL", key);
    };
    /**
     * Returns the string representation of the type of the value stored at key. The different types that
     * can be returned are: string, list, set, zset and hash.
     *
     * @param key The key.
     * @returns Type of key(string, hash, list, set, zset), or none when key does not exist.
     */
    Tedis.prototype.type = function (key) {
        return this.command("TYPE", key);
    };
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
    Tedis.prototype.append = function (key, value) {
        return this.command("APPEND", key, value);
    };
    /**
     * Decrements the number stored at key by one. If the key does not exist, it is set to 0 before performing
     * the operation. An error is returned if the key contains a value of the wrong type or contains a string
     * that can not be represented as integer. This operation is limited to 64 bit signed integers.
     *
     * @param key The key.
     * @returns The value of key after the decrement.
     */
    Tedis.prototype.decr = function (key) {
        return this.command("DECR", key);
    };
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
    Tedis.prototype.decrby = function (key, increment) {
        return this.command("DECRBY", key, increment);
    };
    /**
     * Get the value of key. If the key does not exist the special value nil is returned. An error is returned
     * if the value stored at key is not a string, because `GET` only handles string values.
     *
     * @param key The key.
     * @returns The value of key, or nil when key does not exist.
     */
    Tedis.prototype.get = function (key) {
        return this.command("GET", key);
    };
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
    Tedis.prototype.getbit = function (key, offset) {
        return this.command("GETBIT", key, offset);
    };
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
    Tedis.prototype.getrange = function (key, _a) {
        var _b = _a === void 0 ? [0, -1] : _a, _c = __read(_b, 2), start = _c[0], end = _c[1];
        return this.command("GETRANGE", key, start, end);
    };
    /**
     * Atomically sets key to value and returns the old value stored at key. Returns an error when key
     * exists but does not hold a string value.
     *
     * @param key The key.
     * @param value The value.
     * @returns The old value stored at key, or nil when key did not exist.
     */
    Tedis.prototype.getset = function (key, value) {
        return this.command("GETSET", key, value);
    };
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
    Tedis.prototype.incr = function (key) {
        return this.command("INCR", key);
    };
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
    Tedis.prototype.incrby = function (key, increment) {
        return this.command("INCRBY", key, increment);
    };
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
    Tedis.prototype.incrbyfloat = function (key, increment) {
        return this.command("INCRBYFLOAT", key, increment);
    };
    /**
     * Returns the values of all specified keys. For every key that does not hold a string value or does not
     * exist, the special value nil is returned. Because of this, the operation never fails.
     *
     * @param key The key.
     * @param keys The other key.
     * @returns List of values at the specified keys.
     */
    Tedis.prototype.mget = function (key) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["MGET", key], __read(keys), false));
    };
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
    Tedis.prototype.mset = function (objKV) {
        var arrayKV = [];
        Reflect.ownKeys(objKV).forEach(function (key) {
            arrayKV.push(key, objKV[key]);
        });
        return this.command.apply(this, __spreadArray(["MSET"], __read(arrayKV), false));
    };
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
    Tedis.prototype.msetnx = function (objKv) {
        var arrayKV = [];
        Reflect.ownKeys(objKv).forEach(function (key) {
            arrayKV.push(key, objKv[key]);
        });
        return this.command.apply(this, __spreadArray(["MSETNX"], __read(arrayKV), false));
    };
    /**
     * `PSETEX` works exactly like `SETEX` with the sole difference that the expire time is specified in
     * milliseconds instead of seconds.
     *
     * @param key The key.
     * @param milliseconds Expiration time in milliseconds.
     * @param value The value.
     * @returns "OK".
     */
    Tedis.prototype.psetex = function (key, milliseconds, value) {
        return this.command("PSETEX", key, milliseconds, value);
    };
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
    Tedis.prototype.set = function (key, value) {
        return this.command("SET", key, value);
    };
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
    Tedis.prototype.setbit = function (key, offset, value) {
        return this.command("SETBIT", key, offset, value);
    };
    /**
     * Set key to hold the string value and set key to timeout after a given number of seconds.
     *
     * @param key The key.
     * @param seconds Expiration time in seconds.
     * @param value The value.
     * @returns "OK".
     */
    Tedis.prototype.setex = function (key, seconds, value) {
        return this.command("SETEX", key, seconds, value);
    };
    /**
     * Set key to hold string value if key does not exist. In that case, it is equal to `SET`. When key already
     * holds a value, no operation is performed. `SETNX` is short for "SET if Not eXists".
     *
     * @param key The key.
     * @param keys The other key.
     * @returns 1 if the key was set, 0 if the key was not set.
     */
    Tedis.prototype.setnx = function (key) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["SETNX", key], __read(keys), false));
    };
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
    Tedis.prototype.setrange = function (key, offset, value) {
        return this.command("SETRANGE", key, offset, value);
    };
    /**
     * Returns the length of the string value stored at key. An error is returned when key holds a non-string value.
     *
     * @param key The key.
     * @returns The length of the string at key, or 0 when key does not exist.
     */
    Tedis.prototype.strlen = function (key) {
        return this.command("STRLEN", key);
    };
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
    Tedis.prototype.hdel = function (key, field) {
        var fields = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            fields[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["HDEL", key, field], __read(fields), false));
    };
    /**
     * Returns if field is an existing field in the hash stored at key.
     * @param key The key.
     * @param field The field.
     * @returns 1 if the hash contains field. 0 if the hash does not contain field, or key does not exist.
     */
    Tedis.prototype.hexists = function (key, field) {
        return this.command("HEXISTS", key, field);
    };
    /**
     * Returns the value associated with field in the hash stored at key.
     *
     * @param key The key.
     * @param field The field.
     * @returns The value associated with field, or nil when field is not present in the hash or key does not exist.
     */
    Tedis.prototype.hget = function (key, field) {
        return this.command("HGET", key, field);
    };
    /**
     * Returns all fields and values of the hash stored at key. In the returned value, every field name is followed
     * by its value, so the length of the reply is twice the size of the hash.
     *
     * @param key The key.
     * @returns List of fields and their values stored in the hash, or an empty list when key does not exist.
     */
    Tedis.prototype.hgetall = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = tools_1.Array2Object;
                        return [4 /*yield*/, this.command("HGETALL", key)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
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
    Tedis.prototype.hincrby = function (key, field, increment) {
        return this.command("HINCRBY", key, field, increment);
    };
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
    Tedis.prototype.hincrbyfloat = function (key, field, increment) {
        return this.command("HINCRBYFLOAT", key, field, increment);
    };
    /**
     * Returns all field names in the hash stored at key.
     *
     * @param key The key.
     * @returns List of fields in the hash, or an empty list when key does not exist.
     */
    Tedis.prototype.hkeys = function (key) {
        return this.command("HKEYS", key);
    };
    /**
     * Returns the number of fields contained in the hash stored at key.
     * @param key The key.
     * @returns Number of fields in the hash, or 0 when key does not exist.
     */
    Tedis.prototype.hlen = function (key) {
        return this.command("HLEN", key);
    };
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
    Tedis.prototype.hmget = function (key, field) {
        var fields = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            fields[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["HMGET", key, field], __read(fields), false));
    };
    /**
     * Sets the specified fields to their respective values in the hash stored at key. This command overwrites
     * any specified fields already existing in the hash. If key does not exist, a new key holding a hash is
     * created.
     *
     * @param key The key.
     * @param data The data.
     * @returns "OK".
     */
    Tedis.prototype.hmset = function (key, data) {
        var arrayFV = [];
        Reflect.ownKeys(data).forEach(function (field) {
            arrayFV.push(field, data[field]);
        });
        return this.command.apply(this, __spreadArray(["HMSET", key], __read(arrayFV), false));
    };
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
    Tedis.prototype.hset = function (key, field, value) {
        return this.command("HSET", key, field, value);
    };
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
    Tedis.prototype.hsetnx = function (key, field, value) {
        return this.command("HSETNX", key, field, value);
    };
    /**
     * Returns the string length of the value associated with field in the hash stored at key. If the key or the
     * field do not exist, 0 is returned.
     *
     * @param key The key.
     * @param field The field.
     * @returns The string length of the value associated with field, or zero when field is not present in the
     * hash or key does not exist at all.
     */
    Tedis.prototype.hstrlen = function (key, field) {
        return this.command("HSTRLEN", key, field);
    };
    /**
     * Returns all values in the hash stored at key.
     * @param key The key.
     * @returns List of values in the hash, or an empty list when key does not exist.
     */
    Tedis.prototype.hvals = function (key) {
        return this.command("HVALS", key);
    };
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
    Tedis.prototype.blpop = function (timeout) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(__spreadArray(["BLPOP"], __read(keys), false), [timeout], false));
    };
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
    Tedis.prototype.brpop = function (timeout) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(__spreadArray(["BRPOP"], __read(keys), false), [timeout], false));
    };
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
    Tedis.prototype.brpoplpush = function (source, destination, timeout) {
        return this.command("BRPOPLPUSH", source, destination, timeout);
    };
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
    Tedis.prototype.lindex = function (key, index) {
        return this.command("LINDEX", key, index);
    };
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
    Tedis.prototype.linsert = function (key, type, pivot, value) {
        return this.command("LINSERT", key, type, pivot, value);
    };
    /**
     * Returns the length of the list stored at key. If key does not exist, it is interpreted as an empty
     * list and 0 is returned. An error is returned when the value stored at key is not a list.
     *
     * @param key The key.
     * @returns The length of the list at key.
     */
    Tedis.prototype.llen = function (key) {
        return this.command("LLEN", key);
    };
    /**
     * Removes and returns the first element of the list stored at key.
     *
     * @param key The key.
     * @returns The value of the first element, or nil when key does not exist.
     */
    Tedis.prototype.lpop = function (key) {
        return this.command("LPOP", key);
    };
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
    Tedis.prototype.lpush = function (key, value) {
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["LPUSH", key, value], __read(values), false));
    };
    /**
     * Inserts value at the head of the list stored at key, only if key already exists and holds a list. In
     * contrary to LPUSH, no operation will be performed when key does not yet exist.
     *
     * @param key The key.
     * @param value The value.
     * @returns The length of the list after the push operation.
     */
    Tedis.prototype.lpushx = function (key, value) {
        return this.command("LPUSHX", key, value);
    };
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
    Tedis.prototype.lrange = function (key, start, stop) {
        return this.command("LRANGE", key, start, stop);
    };
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
    Tedis.prototype.lrem = function (key, count, value) {
        return this.command("LREM", key, count, value);
    };
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
    Tedis.prototype.lset = function (key, index, value) {
        return this.command("LSET", key, index, value);
    };
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
    Tedis.prototype.ltrim = function (key, start, stop) {
        return this.command("LTRIM", key, start, stop);
    };
    /**
     * Removes and returns the last element of the list stored at key.
     * @param key The key.
     * @returns The value of the last element, or nil when key does not exist.
     */
    Tedis.prototype.rpop = function (key) {
        return this.command("RPOP", key);
    };
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
    Tedis.prototype.rpoplpush = function (source, destination) {
        return this.command("RPOPLPUSH", source, destination);
    };
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
    Tedis.prototype.rpush = function (key, value) {
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["RPUSH", key, value], __read(values), false));
    };
    /**
     * Inserts value at the tail of the list stored at key, only if key already exists and holds a list.
     * In contrary to RPUSH, no operation will be performed when key does not yet exist.
     *
     * @param key The key.
     * @param value The value.
     * @returns The length of the list after the push operation.
     */
    Tedis.prototype.rpushx = function (key, value) {
        return this.command("RPUSHX", key, value);
    };
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
    Tedis.prototype.sadd = function (key, member) {
        var members = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            members[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["SADD", key, member], __read(members), false));
    };
    /**
     * Returns the set cardinality (number of elements) of the set stored at key.
     *
     * @param key The key.
     * @returns The cardinality (number of elements) of the set, or 0 if key does not exist.
     */
    Tedis.prototype.scard = function (key) {
        return this.command("SCARD", key);
    };
    /**
     * Returns the members of the set resulting from the difference between the first set and all the
     * successive sets. Keys that do not exist are considered to be empty sets.
     *
     * @param key The key.
     * @param anotherkey The anotherkey.
     * @param keys The keys.
     * @returns List with members of the resulting set.
     */
    Tedis.prototype.sdiff = function (key, anotherkey) {
        var keys = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            keys[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["SDIFF", key, anotherkey], __read(keys), false));
    };
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
    Tedis.prototype.sdiffstore = function (destination, key, anotherkey) {
        var keys = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            keys[_i - 3] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["SDIFFSTORE", destination, key, anotherkey], __read(keys), false));
    };
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
    Tedis.prototype.sinter = function (key, anotherkey) {
        var keys = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            keys[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["SINTER", key, anotherkey], __read(keys), false));
    };
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
    Tedis.prototype.sinterstore = function (destination, key, anotherkey) {
        var keys = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            keys[_i - 3] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["SINTERSTORE", destination, key, anotherkey], __read(keys), false));
    };
    /**
     * Returns if member is a member of the set stored at key.
     *
     * @param key The key.
     * @param member The member.
     * @returns 1 if the element is a member of the set. 0 if the element is not a member of the set, or if key
     * does not exist.
     */
    Tedis.prototype.sismember = function (key, member) {
        return this.command("SISMEMBER", key, member);
    };
    /**
     * Returns all the members of the set value stored at key.
     *
     * This has the same effect as running SINTER with one argument key.
     *
     * @param key The key.
     * @returns All elements of the set.
     */
    Tedis.prototype.smembers = function (key) {
        return this.command("SMEMBERS", key);
    };
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
    Tedis.prototype.smove = function (source, destination, member) {
        return this.command("SMOVE", source, destination, member);
    };
    Tedis.prototype.spop = function (key, count) {
        if (typeof count === "number") {
            return this.command("SPOP", key, count);
        }
        else {
            return this.command("SPOP", key);
        }
    };
    Tedis.prototype.srandmember = function (key, count) {
        if (typeof count === "number") {
            return this.command("SRANDMEMBER", key, count);
        }
        else {
            return this.command("SRANDMEMBER", key);
        }
    };
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
    Tedis.prototype.srem = function (key, member) {
        var members = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            members[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["SREM", key, member], __read(members), false));
    };
    /**
     * Returns the members of the set resulting from the union of all the given sets. Keys that do not
     * exist are considered to be empty sets.
     *
     * @param key The key.
     * @param anotherkey The anotherkey.
     * @param keys The other key.
     * @returns List with members of the resulting set.
     */
    Tedis.prototype.sunion = function (key, anotherkey) {
        var keys = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            keys[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["SUNION", key, anotherkey], __read(keys), false));
    };
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
    Tedis.prototype.sunionstore = function (destination, key, anotherkey) {
        var keys = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            keys[_i - 3] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["SUNIONSTORE", destination, key, anotherkey], __read(keys), false));
    };
    Tedis.prototype.zadd = function (key, objMS, options) {
        if (options === void 0) { options = {}; }
        var array = new Array();
        var nxxx = options.nxxx, ch = options.ch, incr = options.incr;
        Reflect.ownKeys(objMS).forEach(function (member) {
            array.push(objMS[member], member);
        });
        if ("undefined" !== typeof nxxx) {
            if ("undefined" !== typeof ch) {
                if ("undefined" !== typeof incr) {
                    return this.command.apply(this, __spreadArray(["ZADD", key, nxxx, ch, incr], __read(array), false));
                }
                else {
                    return this.command.apply(this, __spreadArray(["ZADD", key, nxxx, ch], __read(array), false));
                }
            }
            else if ("undefined" !== typeof incr) {
                return this.command.apply(this, __spreadArray(["ZADD", key, nxxx, incr], __read(array), false));
            }
            else {
                return this.command.apply(this, __spreadArray(["ZADD", key, nxxx], __read(array), false));
            }
        }
        else if ("undefined" !== typeof ch) {
            if ("undefined" !== typeof incr) {
                return this.command.apply(this, __spreadArray(["ZADD", key, ch, incr], __read(array), false));
            }
            else {
                return this.command.apply(this, __spreadArray(["ZADD", key, ch], __read(array), false));
            }
        }
        else if ("undefined" !== typeof incr) {
            return this.command.apply(this, __spreadArray(["ZADD", key, incr], __read(array), false));
        }
        else {
            return this.command.apply(this, __spreadArray(["ZADD", key], __read(array), false));
        }
    };
    /**
     * Returns the sorted set cardinality (number of elements) of the sorted set stored at key.
     *
     * @param key The key.
     * @returns The cardinality (number of elements) of the sorted set, or 0 if key does not exist.
     */
    Tedis.prototype.zcard = function (key) {
        return this.command("ZCARD", key);
    };
    /**
     * Returns the number of elements in the sorted set at key with a score between min and max.
     * @param key The key.
     * @param min The min.
     * @param max The max.
     * @returns The number of elements in the specified score range.
     */
    Tedis.prototype.zcount = function (key, min, max) {
        return this.command("ZCOUNT", key, min, max);
    };
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
    Tedis.prototype.zincrby = function (key, increment, member) {
        return this.command("ZINCRBY", key, increment, member);
    };
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
    Tedis.prototype.zinterstore = function (destination, objectKW, aggregate) {
        if (aggregate === void 0) { aggregate = "SUM"; }
        var keys = [];
        var weights = [];
        Reflect.ownKeys(objectKW).forEach(function (key) {
            keys.push(key);
            weights.push(objectKW[key]);
        });
        return this.command.apply(this, __spreadArray(__spreadArray(__spreadArray(__spreadArray(["ZINTERSTORE",
            destination,
            keys.length], __read(keys), false), ["WEIGHTS"], false), __read(weights), false), ["AGGREGATE",
            aggregate], false));
    };
    /**
     * this command returns the number of elements in the sorted set at key with a value between min and max.
  #
  
     * @param key The key.
     * @param min The min.
     * @param max The max.
     * @returns The number of elements in the specified score range.
     */
    Tedis.prototype.zlexcount = function (key, min, max) {
        return this.command("ZLEXCOUNT", key, min, max);
    };
    Tedis.prototype.zrange = function (key, start, stop, withscores) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!("WITHSCORES" === withscores)) return [3 /*break*/, 2];
                        _a = tools_1.Array2Object;
                        return [4 /*yield*/, this.command("ZRANGE", key, start, stop, "WITHSCORES")];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    case 2: return [2 /*return*/, this.command("ZRANGE", key, start, stop)];
                }
            });
        });
    };
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
    Tedis.prototype.zrangebylex = function (key, min, max, options) {
        if ("object" === typeof options) {
            return this.command("ZRANGEBYLEX", key, min, max, "LIMIT", options.offset, options.count);
        }
        return this.command("ZRANGEBYLEX", key, min, max);
    };
    Tedis.prototype.zrangebyscore = function (key, min, max, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, offset, count, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!("object" === typeof options.limit)) return [3 /*break*/, 4];
                        _a = options.limit, offset = _a.offset, count = _a.count;
                        if (!("WITHSCORES" === options.withscores)) return [3 /*break*/, 2];
                        _b = tools_1.Array2Object;
                        return [4 /*yield*/, this.command("ZRANGEBYSCORE", key, min, max, "WITHSCORES", "LIMIT", offset, count)];
                    case 1: return [2 /*return*/, _b.apply(void 0, [_d.sent()])];
                    case 2: return [2 /*return*/, this.command("ZRANGEBYSCORE", key, min, max, "LIMIT", offset, count)];
                    case 3: return [3 /*break*/, 7];
                    case 4:
                        if (!("WITHSCORES" === options.withscores)) return [3 /*break*/, 6];
                        _c = tools_1.Array2Object;
                        return [4 /*yield*/, this.command("ZRANGEBYSCORE", key, min, max, "WITHSCORES")];
                    case 5: return [2 /*return*/, _c.apply(void 0, [_d.sent()])];
                    case 6: return [2 /*return*/, this.command("ZRANGEBYSCORE", key, min, max)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
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
    Tedis.prototype.zrank = function (key, member) {
        return this.command("ZRANK", key, member);
    };
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
    Tedis.prototype.zrem = function (key, member) {
        var members = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            members[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(["ZREM", key, member], __read(members), false));
    };
    /**
     * This command removes all elements in the sorted set stored at key between the lexicographical
     * range specified by min and max.
     *
     * @param key The key.
     * @param min The min.
     * @param max The max.
     * @returns The number of elements removed.
     */
    Tedis.prototype.zremrangebylex = function (key, min, max) {
        return this.command("ZREMRANGEBYLEX", key, min, max);
    };
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
    Tedis.prototype.zremrangebyrank = function (key, start, stop) {
        return this.command("ZREMRANGEBYRANK", key, start, stop);
    };
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
    Tedis.prototype.zremrangebyscore = function (key, min, max) {
        return this.command("ZREMRANGEBYSCORE", key, min, max);
    };
    Tedis.prototype.zrevrange = function (key, start, stop, withscores) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!("WITHSCORES" === withscores)) return [3 /*break*/, 2];
                        _a = tools_1.Array2Object;
                        return [4 /*yield*/, this.command("ZREVRANGE", key, start, stop, "WITHSCORES")];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    case 2: return [2 /*return*/, this.command("ZREVRANGE", key, start, stop)];
                }
            });
        });
    };
    Tedis.prototype.zrevrangebyscore = function (key, max, min, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, offset, count, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!("object" === typeof options.limit)) return [3 /*break*/, 4];
                        _a = options.limit, offset = _a.offset, count = _a.count;
                        if (!("WITHSCORES" === options.withscores)) return [3 /*break*/, 2];
                        _b = tools_1.Array2Object;
                        return [4 /*yield*/, this.command("ZREVRANGEBYSCORE", key, max, min, "WITHSCORES", "LIMIT", offset, count)];
                    case 1: return [2 /*return*/, _b.apply(void 0, [_d.sent()])];
                    case 2: return [2 /*return*/, this.command("ZREVRANGEBYSCORE", key, max, min, "LIMIT", offset, count)];
                    case 3: return [3 /*break*/, 7];
                    case 4:
                        if (!("WITHSCORES" === options.withscores)) return [3 /*break*/, 6];
                        _c = tools_1.Array2Object;
                        return [4 /*yield*/, this.command("ZREVRANGEBYSCORE", key, max, min, "WITHSCORES")];
                    case 5: return [2 /*return*/, _c.apply(void 0, [_d.sent()])];
                    case 6: return [2 /*return*/, this.command("ZREVRANGEBYSCORE", key, max, min)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the rank of member in the sorted set stored at key, with the scores ordered from high to low.
     * The rank (or index) is 0-based, which means that the member with the highest score has rank 0.
     * @param key The key.
     * @param member The member.
     * @returns
     * - If member exists in the sorted set, Integer reply: the rank of member.
     * - If member does not exist in the sorted set or key does not exist, Bulk string reply: nil.
     */
    Tedis.prototype.zrevrank = function (key, member) {
        return this.command("ZREVRANK", key, member);
    };
    /**
     * Returns the score of member in the sorted set at key.
     *
     * If member does not exist in the sorted set, or key does not exist, nil is returned.
     *
     * @param key The key.
     * @param member The member.
     * @returns The score of member (a double precision floating point number), represented as string.
     */
    Tedis.prototype.zscore = function (key, member) {
        return this.command("ZSCORE", key, member);
    };
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
    Tedis.prototype.zunionstore = function (destination, objectKW, aggregate) {
        if (aggregate === void 0) { aggregate = "SUM"; }
        var keys = [];
        var weights = [];
        Reflect.ownKeys(objectKW).forEach(function (key) {
            keys.push(key);
            weights.push(objectKW[key]);
        });
        return this.command.apply(this, __spreadArray(__spreadArray(__spreadArray(__spreadArray(["ZUNIONSTORE",
            destination,
            keys.length], __read(keys), false), ["WEIGHTS"], false), __read(weights), false), ["AGGREGATE",
            aggregate], false));
    };
    return Tedis;
}(base_1.Base));
exports.Tedis = Tedis;
