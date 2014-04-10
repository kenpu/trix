package main

import (
    "code.google.com/p/goauth2/oauth"
    "net/http"
    "html/template"
)

var (
    code    = ""
    toke    = ""
)

var oauthcfg = &oauth.Config {
    ClientId: "370997618684.apps.googleusercontent.com",
    ClientSecret: "qiql4BZuqJn8fqis-9_WfU_d",
    AuthURL: "https://accounts.google.com/o/oauth2/auth",
    TokenURL: "https://accounts.google.com/o/oauth2/token",
    RedirectURL: "http://localhost:5000/oauth2callback",
    Scope: "https://www.googleapis.com/auth/userinfo.profile",
}

const profileURL = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json"

func main() {
    http.HandleFunc("/", handleRoot)
    http.HandleFunc("/authorize", handleAuthorize)
    http.HandleFunc("/oauth2callback", handleOAuth2Callback)
    http.ListenAndServe("localhost:5000", nil)
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
    t, _ := template.ParseFiles("index.html")
    t.Execute(w, nil)
}

func handleAuthorize(w http.ResponseWriter, r *http.Request) {
    url := oauthcfg.AuthCodeURL("")
    http.Redirect(w, r, url, http.StatusFound)
}

func handleOAuth2Callback(w http.ResponseWriter, r *http.Request) {
    code := r.FormValue("code")
    t := &oauth.Transport{Config: oauthcfg}
    t.Exchange(code)
    resp, _ := t.Client().Get(profileURL)

    buf := make([]byte, 1024)
    resp.Body.Read(buf)
    tmpl, _ := template.ParseFiles("profile.html")
    tmpl.Execute(w, string(buf))
}
