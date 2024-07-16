"use client"

import {JSX, SVGProps, useState} from "react"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Slider} from "@/components/ui/slider"
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button"
import {toast} from "sonner";
import {useRecoilState} from "recoil";
import {generatedPassword} from "@/state/atoms";
import {Input} from "@/components/ui/input";

export default function Generator() {
  const [password, setPassword] = useRecoilState(generatedPassword)
  const [algorithm, setAlgorithm] = useState("sha256")

  const calculatePasswordTimeToCrack = (password: string) => {

    return 80
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast.success("Password copied to clipboard")
    }).catch((error) => {
      toast.error("Failed to copy password to clipboard")
    })
  }

  const passwordStrength = calculatePasswordTimeToCrack(password)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Password Generator</CardTitle>
        <CardDescription>Create a strong, random password for your accounts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="algorithm">Algorithm</Label>
          <Select value={algorithm} onValueChange={(e) => setAlgorithm(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Select algorithm"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sha256">SHA-256</SelectItem>
              <SelectItem value="aes">AES</SelectItem>
              <SelectItem value="argon2">Argon2</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {
          algorithm === "custom" ? <CustomPassword/> :
            algorithm === "sha256" ? <Sha256Password/> :

              <Card>
                <CardHeader>
                  <CardTitle>
                    Work In Progress
                  </CardTitle>
                  <CardDescription>
                    This feature is currently under development. And will be available soon.
                  </CardDescription>
                </CardHeader>
              </Card>
        }
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-between">
        {!!generatedPassword && (
          <div
            className="flex items-center gap-2 bg-secondary text-secondary-foreground rounded-md p-2 max-w-full w-full">
            <code
              className={'text-sm font-mono overflow-clip hover:overflow-auto w-full max-w-full'}>{password}</code>
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              <CopyIcon className="h-4 w-4"/>
              <span className="sr-only">Copy to clipboard</span>
            </Button>
          </div>
        )}
        {!!generatedPassword && (
          <div className="flex items-center w-full gap-2">
            <div className="text-sm text-muted-foreground">Password Strength: {passwordStrength}%</div>
            <div className="w-32"/>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

function CustomPassword() {
  const [pasword, setGeneratedPassword] = useRecoilState(generatedPassword)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [length, setLength] = useState(16)
  const generatePassword = () => {
    let charset = ""
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-="
    let password = ""
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setGeneratedPassword(password)
  }


  return (<>
      <div className="grid gap-2">
        <Label htmlFor="length">Length</Label>
        <Slider id="length" min={8} max={32} step={1} value={[length]} onValueChange={(value) => setLength(value[0])}/>
        <div className="text-sm text-muted-foreground">{length} characters</div>
      </div>
      <div className="grid gap-2">
        <Label>Character Types</Label>
        <div className="flex items-center gap-2">
          <Checkbox
            id="uppercase"
            checked={includeUppercase}
            onCheckedChange={(checked) => setIncludeUppercase(!!checked)}/>
          <Label htmlFor="uppercase">Uppercase</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="lowercase"
            checked={includeLowercase}
            onCheckedChange={(checked) => setIncludeLowercase(!!checked)}/>
          <Label htmlFor="lowercase">Lowercase</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={(checked) => setIncludeNumbers(!!checked)}/>
          <Label htmlFor="numbers">Numbers</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={(checked) => setIncludeSymbols(!!checked)}/>
          <Label htmlFor="symbols">Symbols</Label>
        </div>
        <Button onClick={generatePassword}>Generate</Button>
      </div>
    </>
  )
}

function Sha256Password() {
  const [password, setPassword] = useRecoilState(generatedPassword)

  const [salt, setSalt] = useState("")
  const [text, setText] = useState("")

  function stringToUint8Array(str: string) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  }

  const generateHash = async () => {
    const textBytes = stringToUint8Array(text);
    const saltBytes = stringToUint8Array(salt);

    // Concatenate salt and text bytes
    const combinedBytes = new Uint8Array(saltBytes.length + textBytes.length);
    combinedBytes.set(saltBytes);
    combinedBytes.set(textBytes, saltBytes.length);

    // Hash the combined bytes
    const hashBuffer = await crypto.subtle.digest('SHA-256', combinedBytes);

    // Convert the hash buffer to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    setPassword(hashHex);
  };

  return (<>
      <div className="space-y-4">
        <div>
          <Label htmlFor="salt">Salt</Label>
          <Input id="salt" type="text" placeholder="Enter salt" value={salt} onChange={(e) => setSalt(e.target.value)}/>
        </div>
        <div>
          <Label htmlFor="text">Hash</Label>
          <Input id="text" type="text" placeholder="Enter hash" value={text} onChange={(e) => setText(e.target.value)}/>
        </div>
        <Button
          onClick={generateHash}
        >
          Generate SHA-256 Hash
        </Button>
        <div className="text-center text-muted-foreground" id="hash"/>
      </div>
    </>
  )
}

function CopyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
  )
}