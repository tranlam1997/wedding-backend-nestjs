import request from 'request';

export const stripDomain = (url: string) => {
    return url.replace(/^.*\/\/[^\/]+/, '');
}

export const stripAccents = (str: string) => {
    if (!str) return str;
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

export const extractAttachmentId = (s: string) => {
    if (!s) return ''
    const index = s.lastIndexOf('/')
    return s.substring(index + 1, s.length)
}

export const removeAllDolarAndComma = (s: string) => {
    if(!s) return ''
    return s.replace(/[\$\,]/g, '_');
}

export const encodeAttachment = (attachment: { id: any; fileName: any; size: any; type: any; width: any; height: any; }) => {
    const { id, fileName, size, type, width, height } = attachment;
    return `${id}$${fileName}$${type}$${size}${width}${height}`
}

export const encodeAttachments = (items: any[]) => {
    return items.map((e: any) => encodeAttachment(e)).join(',')
}

export function doRequest(url: string) {
	return new Promise(function (resolve, reject) {
		request(url, function (error, res, body) {
			if (!error && res.statusCode === 200) {
				resolve(body);
			} else {
				reject(error);
			}
		});
	});
}
