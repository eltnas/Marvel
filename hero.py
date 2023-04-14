import json
import requests
from urllib.request import urlopen
from bs4 import BeautifulSoup

def multReplace(text):
    text.replace('ã', 'a')
    text.replace('õ', 'o')
    text.replace('é', 'e')
    text.replace('í', 'i')
    text.replace(' ', '_')
    return text

try:
    with open('links_hero.txt', 'r') as arq:
        linhas = arq.readlines()

        for linha in linhas:
            link = linha.strip()

            try:
                html = urlopen(link)
                res = BeautifulSoup(html.read(), "html.parser")
                div = res.find("div", {"class": "post-body"}) # Para buscar em outro site, pode substuir a tag e seu nome
                img = div.find("img", {"src": True})
                if div:
                    spans = div.find_all("span")
                    infoSpan = []  # Aqui cria uma lista vazia para armazenas os valores pegos no site
                    for span in spans:
                        infoSpan.append(span.get_text())  # Adiciona o valor a lista
                        valores_remove = ['igilante', 'Veja a lista de personagens de Marvel Comics.', 'Até a próxima postagem!', 'Até a próxima postagem! ', '\n']
                        for el in valores_remove:
                            if el in infoSpan:
                                infoSpan.remove(el)

                    heroi = [] # Array vazio para inserir as informações
                    # Nome do heroi
                    heroi.append(infoSpan.pop(0).split())
                    heroi[0][0] = heroi[0][0].replace(':', '').lower()
                    heroi[0][1] = ' '.join(heroi[0][1:])

                    # Nome original
                    heroi.append(infoSpan.pop(0).split())
                    heroi[1][0] = heroi[1][0].lower()
                    heroi[1][1] = heroi[1][1].replace(':', '').lower()

                    # Aqui trata "identidade", "origem", "altura", "peso", "ocupacao", "afiliacao"
                    for i in range(6):
                        id = 2 + i
                        heroi.append(infoSpan.pop(0).split())
                        heroi[id][0] = heroi[id][0].replace(':', '').lower()
                        heroi[id][0] = heroi[id][0].replace('ç', 'c').replace('õ', 'o').replace('ã', 'a').replace('v', 'vigilante')
                        heroi[id][1] = ' '.join(heroi[id][1:])
                        
                    heroi.append(infoSpan.pop(0).split())
                    heroi.append([])
                    heroi[8] = 'descricao'
                    heroi.append([])
                    heroi[9] = ' '.join(infoSpan)

                    print(f'\n2 - {heroi}')

                with open('herois.json', 'w') as f:
                    for indice, heroi in enumerate(heroi, 1):
                        # Cria o dicionário com as informações do herói
                        heroi_dict = {
                            heroi[0][0]: heroi[0][1],
                            f"{heroi[1][0]}_{heroi[1][1]}": heroi[1][2],
                            heroi[2][0]: heroi[2][1],
                            heroi[3][0]: heroi[3][1],
                            heroi[4][0]: heroi[4][1],
                            heroi[5][0]: heroi[5][1],
                            heroi[6][0]: heroi[6][1],
                            heroi[7][0]: heroi[7][1],
                            heroi[8]: heroi[9],
                            'image': f"{heroi[0][1]}.jpg"
                        }
                        # Escreve o dicionário no arquivo JSON
                        json.dump(str(cod) + '{' + heroi_dict + '}', f)
                        f.write('\n')
                        print(indice + '{' + heroi_dict + '}')

                if img:
                    img_url = 'https:' + img['src']
                    print(img_url)
                    nomeImg = heroi[0][1]
                    nomeImg = nomeImg.replace('ã', 'a')
                    nomeImg = nomeImg.replace('õ', 'o')
                    nomeImg = nomeImg.replace('é', 'e')
                    nomeImg = nomeImg.replace('í', 'i')
                    nomeImg = nomeImg.replace(' ', '_')
                    response = requests.get(img_url)
                    with open(f"{nomeImg}.jpg", "wb") as f:
                        f.write(response.content)
                else:
                    print("Não foi possível encontrar a tag <img>")

            except Exception as e:
                print(f"Erro ao abrir {link}: {e}")

            finally:
                html.close()

except Exception as e:
    print(f"Erro ao abrir arquivo: {e}")
