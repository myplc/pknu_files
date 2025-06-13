import { useState } from 'react'
import Crypto from 'crypto-js'

const Cryp = () => {
    const [inid, setInid] = useState('')
    const [inpw, setInpw] = useState('')
    const [skey, setSkey] = useState('')


    const [encrypt, setEncrypt] = useState('') // 암호화
    const [decrypt, setDecrypt] = useState('') // 복호화
    const [sha, setSha] = useState('') // 단방향 SHA256 해시

    const encryptFn = () => {
        const data = { id: inid, pw: inpw } // 원하는 형태로 객체화
        const encData = Crypto.AES.encrypt(JSON.stringify(data), skey).toString() // skey 와 함께 데이터를 암호화
        setEncrypt(encData)
    }

    const decryptFn = () => {
        try {
            const bytes = Crypto.AES.decrypt(encrypt, skey)
            const decrypted = JSON.parse(bytes.toString(Crypto.enc.Utf8))
            setDecrypt(decrypted)
        } catch (error) {
            console.log('복호화오류', error)
            alert('복호화에 실패하였습니다. 암호키를 확인하세요.')
        } finally {
            alert('암호키관리에 주의하세요.')
        }
    }

    const sha256Fn = () => {
        const data = { id: inid, pw: inpw } // 원하는 형태로 객체화
        const encData = Crypto.SHA256(JSON.stringify(data)).toString() // skey 와 함께 데이터를 암호화
        setSha(encData)
    }

    /* 핸들러 */
    const handleIdChange = e => setInid(e.target.value)
    const handlePwChange = e => setInpw(e.target.value)
    const handleKeyInput = e => setSkey(e.target.value)

    return (
        <>
            <h1>2. 암호화, 복호화, 단방향</h1>
            <div>
                ID : <input type="text" onChange={handleIdChange} value={inid} />
            </div>
            <div>
                Pw : <input type="password" onChange={handlePwChange} value={inpw} />
            </div>
            <div>
                Key : <input type="password" onChange={handleKeyInput} value={skey} />
            </div>
            <button onClick={encryptFn} disabled={!(inid && inpw && skey)}>암호화 동작</button>
            <hr />
            <div>암호화 전: {(inid && inpw) && JSON.stringify({ id: inid, pw: inpw })}</div><br />
            <div>{(!!encrypt) && `암호화 후: ${encrypt} (글자수: ${encrypt.length})`}</div><hr />

            <div>복호화 암호키
                <input type="password" onChange={handleKeyInput} value={skey} />
            </div>
            <button onClick={decryptFn} disabled={!(inid && inpw && skey)}>복호화 동작</button>
            <div>{!!decrypt && JSON.stringify(decrypt)}</div>
            <div>{!!decrypt && `복호화된 데이터: ID는 ${decrypt.id}이고, PASSWORD는 ${decrypt.pw} 입니다.`}</div>
            <hr />
            <button onClick={sha256Fn} disabled={!(inid && inpw && skey)}>단방향 암호화 하기</button>
            <h3>{sha && `SHA256암호화: ${sha} (길이:${sha.length})`}</h3>
        </>
    )
}

export default Cryp