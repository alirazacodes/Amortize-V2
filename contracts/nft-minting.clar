
;; nft-minting
;; <contract for minting the information of the equity inside the house>

;; super-user
(define-constant super-user tx-sender)

;; constants
;; Failed to mint error
(define-constant Failed-to-mint-error (err u1))
(define-constant owner-auth-failed (err u2))

;; data maps and vars
;; Mapping data for the property details 
(define-map prop-data 
    ;; ERR: Public Data, as all maps are public
    {token-id: uint}
    {data-hash: (buff 32), token-uri: (string-ascii 64), usd-price: uint, btc-usd-price: uint, agent: principal}
)

;; defining non-fungible token for Amortize
(define-non-fungible-token amortize-nft uint)

;; setting token-id of the NFT
(define-data-var curr-token-id uint u1)



(define-public (transfer-ownership (id uint) (new-owner principal))
  (begin
    (asserts! (is-eq (unwrap-panic (nft-get-owner? amortize-nft id)) tx-sender) owner-auth-failed)
    (nft-transfer? amortize-nft id tx-sender new-owner)
  )
)

(define-public (burn-nft (id uint))
  (begin
    (asserts! (is-eq (unwrap-panic (nft-get-owner? amortize-nft id)) tx-sender) owner-auth-failed)
    (nft-burn? amortize-nft id tx-sender)
  )
)

;; private functions
;; Registering the token
(define-private (register-token (new-owner principal) (token-id uint))
    (begin
      (unwrap! (nft-mint? amortize-nft token-id new-owner) false)
    )
)

;;Check Owner
(define-private (is-owner (actor principal) (token-id uint))
  (is-eq actor
    (unwrap! (nft-get-owner? amortize-nft token-id) false)
  )
)


;; public functions
;; minting the nft on blockchain
(define-public (mint 
(owner principal)
  (data-hash (buff 32))
  (token-uri (string-ascii 64))
  (usd-price uint)
  (btc-usd-price uint)
  (agent principal)
) 
    (let
        (
            (token-id (+ (var-get curr-token-id) u1))
        )
    
        (asserts! (register-token owner token-id) Failed-to-mint-error)
          (map-set prop-data
            {token-id: token-id}
            {data-hash: data-hash, token-uri: token-uri, usd-price: usd-price, btc-usd-price: btc-usd-price, agent: agent}
          )
        (var-set curr-token-id token-id)
        (ok true)

    )
)

;; Fetching price
(define-read-only (get-price (token-id uint))
    (map-get? prop-data { token-id: token-id })
)

;; Fetch Data-hash
(define-read-only (get-data-hash (token-id uint))
    (unwrap-panic (get data-hash (map-get? prop-data {token-id: token-id})))
)

;; Fetch Token-uri
(define-read-only (get-token-urii (token-id uint))
    (unwrap-panic (get token-uri (map-get? prop-data {token-id: token-id})))
)

;; Reading the super-user
(define-read-only (is-super-user)
  (is-eq tx-sender super-user)
)

(define-read-only (get-agent (token-id uint))
    (unwrap-panic (get agent (map-get? prop-data {token-id: token-id})))
)

(define-read-only (get-btc-price (token-id uint))
    (unwrap-panic (get btc-usd-price (map-get? prop-data {token-id: token-id})))
)

(define-read-only (get-usd-price (token-id uint))
    (unwrap-panic (get usd-price (map-get? prop-data {token-id: token-id})))
)

(define-read-only (get-owner (id uint))
  (unwrap-panic (nft-get-owner? amortize-nft id))
)

(define-read-only (is-claimed (id uint) )
  (is-eq (unwrap-panic (nft-get-owner? amortize-nft id)) (unwrap-panic (get agent (map-get? prop-data {token-id: id}))))
)