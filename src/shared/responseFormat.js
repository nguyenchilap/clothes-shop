export default function responseFormat(ok, meta, data) {
    return {
        meta: {
            ok,
            ...meta
        },
        data
    }
}