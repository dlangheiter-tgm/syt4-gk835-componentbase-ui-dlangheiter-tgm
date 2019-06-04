# Middleware Engineering "Componentbase UI with Spring React"

## Aufgabenstellung
Die detaillierte [Aufgabenstellung](TASK.md) beschreibt die notwendigen Schritte zur Realisierung.

## Implementierung

Der Code vom Beispiel ist ganz einfach aufgebaut.

Wir haben den Java/Backend Teil, der eigentlich nur Angestellte speichert. Diese werden automatisch üver eine REST-Schnittstelle zugänglich gemacht. Dies geht über den Basispfad `/api`. Auf dem Pfad `/` bekommt man eine HTML-Datei die einfach einen Titel definiert, den Anfangspunkt für React und lädt die zusammengefaste JS-Datei.

Der Author verwendet eine JS-Library um auf die REST-Schnittstelle zuzugreifen. Diese verwende ich in meinem Code nicht mehr.

### Wichtige Code-Stellen

Folgender Code sagt React in welchem Element es sein Virtueles-Dom rendern soll.

```jsx
ReactDOM.render(
    <App/>,
    document.getElementById('react')
);
```

Der nächste Code definiert eine Komponente. Bessergesagt die Hauptkomponente. Dies definiert ein basis `Div` damit wir eine gute basis haben (Hat auch ein paar CSS eigenschaften). Weiter haben wir eine `CssBaseline` Komponente von `material-ui` um bestimmte CSS eigenschaften auf der Seite zurückzusetzten da die in unterschiedlichen Browsern unterschiedlich gesetzt sind (Margin, Padding,...). Dannach haben wir einen Router von `react-router-dom`. Diesen verwende ich um auf unterschiedliche seiten zugreifen zu können obwohl wir nur eine HTML-Datei haben. Unter diesem habe ich zwei Routen auch von `react-router-dom` implementiert. Diese laden je nachdem welche URL wir haben unterschiedliche Komponenten. Bei `/` und nur bei `/` lädt er `Windparks`. Wenn allerdings `/windpark/1` eingegeben wird wird `Windengines` angezeigt.

```jsx
class app extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <Router>
                    <Route path={'/'} exact={true} component={Windparks} />
                    <Route path={'/windpark/:wpId'} component={Windengines} />
                </Router>
            </div>
        )
    }
}
```

Im nächsten Schritt habe ich `windparks` implementiert. Dies ist nicht nur eine "einfache" React-Komponente sondern hat auch einen Status (State). Dieser wird im `constructor` initialisiert. In diesem fall setzten wir `windparks` auf eine leere Liste. In der Methode `componentDidMount`, welche aufgerufen wird wenn die Komponente fertig initialisiert wurde, rufen wir `fetchData` auf. Diese verwendet die [fetch-API](<https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API>) um die Daten vom Server abzufragen. Diese Daten dann von JSON in ein JS-Objekt zu transformieren und diese dann in den Status speichert.

```jsx
class windparks extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            windparks: [],
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const res = await fetch(buildPath('windpark'));
        const data = await res.json();
        this.setState({windparks: data});
    }
    
    render() {...}
}
```

Gehen wir weiter zur Render-Methode. In dieser verwende ich ein `React.Fragmen` um mehr als eine Komponente darunter zu platzieren. Es ist im Normalfall nur möglich eine Komponente zurück zuliefern. Danach generiere ich ein `Grid` Komponenten. Diesen befülle ich mit dem Unterschiedlichen Windparks. Dies mache ich mit `this.state.windparks.map`. Dies geht über alle Einträge in der Liste und generiert mehrere Einträge. Darin gibt es eine `Link` Komponente welche auf den Pfad `windpark/:wpId` verweist. Damit kann ich dann auf die Anzeige der Windkraftanlagen zugreifen.

```jsx
render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Typography variant={"h2"}>Windparks:</Typography>
                <br/>
                <Grid container spacing={16}>
                    {this.state.windparks.map(wp => (
                        <Grid item xs={6} key={wp.ownId}>
                            <Link to={`windpark/${wp.ownId}`} className={classes.resetLink}>
                                <Card className={classes.item}>
                                    <Typography variant={"h3"}>Windpark {wp.ownId}</Typography>
                                    <Typography>{wp.jsonDataUrl}</Typography>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </React.Fragment>
        )
    }
```

In `Windengines` mache ich fast das selbe außer das ich einen anderen Pfad abfrage und dann Statt links ein Linien-Diagramm zeichne.

#### settings.js

```jsx
export const endpoint = 'http://localhost:8180/';
export const extension = '/data/json';

export const buildPath = function (req) {
    return `${endpoint}${req}${extension}`
};
```

In dieser Datei habe ich gespeichert auf welche URL zugegriffen wird (`http://localhost:8180/`) und was am ende angehängt wird (`/data/json`). Weiters gibt es eine Funktion um eine komplette URL zu erstellen mit einem Benutzerdefinierten zwischenteil.

## Probleme

Wenn man den JS code ändert muss man diesen erst neu "Compilieren". Dies kann man machen indem
man das Programm über Maven neustarten oder `mvn install` ausfürhen. Danach kann man es im 
Browser neu laden.



## Fragen
+ **Was ist React?** 
Is eine JavaScript library um UIs zu bauen. Dabei verwended es ein VirtualDom und updated das "echte" DOM nur
wenn notwendig.
+ **React untertützt eine komponentenbasierte Entwicklung. Beschreiben Sie den Begriff "Component" im Zusammenhang mit React.** 
Komponenten sind kleine Einheiten aus dem man dann das UI zusammensetzt. Alle Komponenten können ihren eigenen
status (state) haben.
+ **Wozu wird die Klasse React.Component verwendet?** 
Um eine in ES6 geschriebene Klasse als React Component auszuweisen. Wenn man es nicht erweitert weis React nicht
wie er die Klasse rendern soll.
+ **Welche Teile der Applikation werden in der Funktion render() implementiert?** 
Was ins DOM geschrieben werden soll. AKA die HTML struktur.
+ **Vervollständigen Sie die angeführten Sätze:**
  + React is a **JavaScript library** - one of the most popular ones, with over 100,000 stars on GitHub.
  + React **is not** a framework (unlike Angular, which is more opinionated).
  + React is an **open-source** project created by **Facebook** .
  + React is used to build **user interfaces (UI)** on the front end.
  + React is the **view** layer of an MVC application (Model View Controller)

## Quellen
