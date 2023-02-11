const stripDomain = (url: string) => {
    return url.replace(/^.*\/\/[^\/]+/, '');
}

const stripAccents = (str: string) => {
    if (!str) return str;
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

const extractAttachmentId = (s: string) => {
    if (!s) return ''
    const index = s.lastIndexOf('/')
    return s.substring(index + 1, s.length)
}

const removeAllDolarAndComma = (s: string) => {
    if(!s) return ''
    return s.replace(/[\$\,]/g, '_');
}

const encodeAttachment = (attachment: { id: any; fileName: any; size: any; type: any; width: any; height: any; }) => {
    const { id, fileName, size, type, width, height } = attachment;
    return `${id}$${fileName}$${type}$${size}${width}${height}`
}

const encodeAttachments = (items: any[]) => {
    return items.map((e: any) => encodeAttachment(e)).join(',')
}


module.exports = {
    stripDomain,
    stripAccents,
    extractAttachmentId,
    removeAllDolarAndComma,
    encodeAttachment,
    encodeAttachments
}