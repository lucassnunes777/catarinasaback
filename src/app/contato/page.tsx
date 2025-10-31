import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Contato</h1>
      <p className="mt-2 text-foreground/70">Preencha o formulário e retornarei em breve.</p>
      <form className="mt-6 grid grid-cols-1 gap-4">
        <Input placeholder="Nome" required />
        <Input placeholder="E-mail" type="email" required />
        <Input placeholder="Telefone" required />
        <Textarea placeholder="Como posso ajudar?" rows={6} />
        <Button variant="primary" className="w-full">Enviar</Button>
      </form>
    </div>
  )
}


