;; <Contract for mathematical calculations of Amortize working>

;; constants

;; data maps and vars
;; mapping for years 
(define-map years {year: int} 
    {   
        home-equity: int,  
        btc-in-contract: int, ;; bitcoin in contract 
        est-price-BTC: int,  ;; estimated price of bitcoin
        est-contract-val: int,  ;; estimated contract value
        contract-price: int,  
        est-profit: int ;; estimated profite
    }
)

;; map for contract appreciation calculation
(define-map CA {year: int}
    {
        payment: int, 
        balance: int, 
        anuity-withdrawal: int, 
        tx-fee: int, ;; tax fee
        btc-yield-nft: int, ;; bitcoin yielding in NFT
        nft-yield-usd: int, ;; NFT yielding in USD
        contract-appr: int, ;; contract appreciation
        nft-rev-opt-call: int,  ;; NFT revenue option call
        opt-call-fee: int, ;; Option call fee
        est-btc-price: int ;; estimated bitcoin price
    } 
)

;; Varibales
(define-data-var term-length int 10)

(define-data-var price-BTC int 50000)

(define-data-var value-home int 500000)

(define-data-var curr-mortgage-balance int 200000)

(define-data-var equity-mint int 0)

(define-data-var bitcoin-to-contract int 0)

(define-data-var amortize-rate int 0)

(define-data-var amortize-const int 0)

(define-data-var payment-per-year int 1)

(define-data-var rate-per-period int 15)

(define-data-var year int 1)

;; public and private functions

;; calculating equity minting
(define-public (minting-equity) 
    (if (< ( / (- (var-get value-home) (var-get curr-mortgage-balance)) 2 ) (var-get price-BTC))
        (ok (var-set equity-mint ( / (- (var-get value-home) (var-get curr-mortgage-balance)) 2 )))
        (ok (var-set equity-mint (var-get price-BTC)))  
    )
)

;; bitcoin to contract
(define-public (btc-to-contract)
    (ok (var-set bitcoin-to-contract ( / (var-get equity-mint) (var-get price-BTC))))
)

;; amortize rate calculation
(define-public (amortize-Rate)
    (begin
        (asserts! (or (is-eq (var-get term-length) 5) (is-eq (var-get term-length) 7) (is-eq (var-get term-length) 10)) (err false))
        (asserts! (not (is-eq (var-get term-length) 5)) (ok (var-set amortize-rate 23)))
        (asserts! (not (is-eq (var-get term-length) 7)) (ok (var-set amortize-rate 18)))
        (ok (var-set amortize-rate 15))
    )    
)

;; calculating rate per period
(define-public (rate-per-Period)
    (ok 
        (var-set rate-per-period 
            ( * 100 
                (- (pow 
                        (+ 1 ( / ( / (var-get amortize-rate) 100) (var-get bitcoin-to-contract) )) 
                    ( / (var-get bitcoin-to-contract) (var-get payment-per-year))  ;; Decimal Issues returning 0 due to division
                    ) 
                1)
            ) 
        )
       
    )
)

;; Amortize constant calculation          
(define-public (amortize-constant)
    (ok 
        (var-set amortize-const 
            ( / 
                (* (var-get bitcoin-to-contract) (var-get rate-per-period)) 
                ;; Decimal Issues returning 0 due to division, pow second argument cannot be < 0 problem  
                (- 1 ( pow (+ 1 (var-get rate-per-period)) (* -1 (var-get payment-per-year) (var-get term-length))))
                ;;pow (2,-3)
            )
        )
    )
)

;; estimating maximum profit
(define-private (max-est-profit) 
    (if 
        (> 
            (- 
                (- 
                    (unwrap-panic (get est-contract-val (map-get? years {year: (var-get year)}))) 
                    (unwrap-panic (get contract-price (map-get? years {year: (var-get year)})))
                ) 
                (* 
                    (unwrap-panic (get est-contract-val (map-get? years {year: (var-get year)})))
                    (/ 5 100)
                )
            )
        0)
        (- 
            (- 
                (unwrap-panic (get est-contract-val (map-get? years {year: (var-get year)}))) 
                (unwrap-panic (get contract-price (map-get? years {year: (var-get year)})))
            ) 
            (* 
                (unwrap-panic (get est-contract-val (map-get? years {year: (var-get year)})))
                (/ 5 100)
            )
        )
        0   
    )
)

;; calculating bitcoin appreciation rate
(define-public (btc-appreciation)
    (begin

        (if (is-eq (var-get year) 1) ;; for first year

            (ok (map-set years {year: 1}
                {
                    home-equity: (+ 
                                    (- (var-get value-home) (var-get curr-mortgage-balance)) 
                                    (* (/ 5 100) (- (var-get value-home) (var-get curr-mortgage-balance)))
                                ),
                    btc-in-contract: (+ 
                                        (- (var-get bitcoin-to-contract) (var-get amortize-const)) 
                                        (* (var-get bitcoin-to-contract) (var-get rate-per-period))
                                    ),
                    est-price-BTC: (+ 
                                        (* (var-get price-BTC) (/ 5 100)) (var-get price-BTC)
                                    ),
                    est-contract-val: (* 
                                        (+ 
                                            (- (var-get bitcoin-to-contract) (var-get amortize-const)) 
                                            (* (var-get bitcoin-to-contract) (var-get rate-per-period))
                                        ) 
                                        (+ 
                                            (* (var-get price-BTC) (/ 5 100)) 
                                            (var-get price-BTC)
                                        )
                                    ),
                    contract-price: (+ 
                                        (unwrap-panic (get nft-rev-opt-call (map-get? CA {year: 1}))) 
                                        (unwrap-panic (get opt-call-fee (map-get? CA {year: 1})))
                                    ), 
                    est-profit: (max-est-profit)
                }
            )
        )
        
            ;; Home Equity
            ;; (var-set home-equity (+ (- (var-get value-home) (var-get curr-mortgage-balance)) (* (/ 5 100) (- (var-get value-home) (var-get curr-mortgage-balance)))))
        
            ;; Bitcoin in Contract
            ;; (var-set BTC-in-contract (+ (- (var-get bitcoin-to-contract) (var-get amortize-const)) (* (var-get bitcoin-to-contract) (var-get rate-per-period))))

            ;; Estimated price of bitcoin
            ;;(var-set EST-price-BTC (+ (* (var-get price-BTC) (/ 5 100)) (var-get price-BTC)))

            ;; Estimated value of contract
            ;;(var-set EST-contract-val (* (var-get BTC-in-contract) (var-get EST-price-BTC)))

            (ok (map-set years {year: (var-get year)}
                    {
                        home-equity: (+ 
                                        (unwrap-panic (get home-equity (map-get? years {year: (- (var-get year) 1)})))
                                        (* 
                                            (unwrap-panic (get home-equity (map-get? years {year: (- (var-get year) 1)}))) 
                                            (/ 5 100)
                                        )
                                    ),
                        btc-in-contract: (unwrap-panic (get balance (map-get? CA {year: (var-get year)}))),
                        est-price-BTC: (unwrap-panic (get est-btc-price (map-get? CA {year: (var-get year)}))),
                        est-contract-val: (* 
                                            (unwrap-panic (get balance (map-get? CA {year: (var-get year)}))) 
                                            (unwrap-panic (get est-btc-price (map-get? CA {year: (var-get year)})))
                                        ),
                        contract-price: (+ 
                                            (unwrap-panic (get nft-rev-opt-call (map-get? CA {year: (var-get year)}))) 
                                            (unwrap-panic (get opt-call-fee (map-get? CA {year: (var-get year)})))
                                        ),
                        est-profit: (max-est-profit)
                    }
                )
            )

        )

    )
)

;; calculating contract appreciation
(define-public (contract-appreciation)
    (begin

        (if (is-eq (var-get year) 1)

            (ok (map-set CA {year: 1}
                    {
                        payment: (* (var-get rate-per-period) (var-get bitcoin-to-contract)), 
                        balance: (+ 
                                    (* (var-get rate-per-period) (var-get bitcoin-to-contract)) 
                                    (- (var-get bitcoin-to-contract) (var-get amortize-const))
                                ), 
                        anuity-withdrawal: (- 
                                                (var-get amortize-const) 
                                                (* (var-get rate-per-period) (var-get bitcoin-to-contract))
                                            ), 
                        tx-fee: 0, 
                        btc-yield-nft: (- 
                                            (- 
                                                (var-get amortize-const) 
                                                (* (var-get rate-per-period) (var-get bitcoin-to-contract))
                                            ) 
                                        0), 
                        nft-yield-usd: (* 
                                            (- 
                                                (- 
                                                    (var-get amortize-const) 
                                                    (* (var-get rate-per-period) (var-get bitcoin-to-contract))
                                                ) 
                                            0) 
                                            (+ 
                                                (* 
                                                    (var-get price-BTC) 
                                                    (/ 50 100)
                                                ) 
                                            (var-get price-BTC)
                                            )
                                        ), 
                        contract-appr: 0, 
                        nft-rev-opt-call: 0, 
                        opt-call-fee: 0, 
                        est-btc-price: (+ (* (var-get price-BTC) (/ 50 100)) (var-get price-BTC))
                    } 
     
                )
            )
        
            ;; Home Equity
            ;; (var-set home-equity (+ (- (var-get value-home) (var-get curr-mortgage-balance)) (* (/ 5 100) (- (var-get value-home) (var-get curr-mortgage-balance)))))
        
            ;; Bitcoin in Contract
            ;; (var-set BTC-in-contract (+ (- (var-get bitcoin-to-contract) (var-get amortize-const)) (* (var-get bitcoin-to-contract) (var-get rate-per-period))))

            ;; Estimated price of bitcoin
            ;;(var-set EST-price-BTC (+ (* (var-get price-BTC) (/ 5 100)) (var-get price-BTC)))

            ;; Estimated value of contract
            ;;(var-set EST-contract-val (* (var-get BTC-in-contract) (var-get EST-price-BTC)))

            ;; (ok (map-set years {year: (var-get year)}
            ;;   {home-equity: (+ (- (var-get value-home) (var-get curr-mortgage-balance)) (* (/ 5 100) (- (var-get value-home) (var-get curr-mortgage-balance)))),
            ;;  btc-in-contract: (+ (- (var-get bitcoin-to-contract) (var-get amortize-const)) (* (var-get bitcoin-to-contract) (var-get rate-per-period))),
            ;;  est-price-BTC: (+ (* (var-get price-BTC) (/ 5 100)) (var-get price-BTC)),
            ;;  est-contract-val: (* (+ (- (var-get bitcoin-to-contract) (var-get amortize-const)) (* (var-get bitcoin-to-contract) (var-get rate-per-period))) (+ (* (var-get price-BTC) (/ 5 100)) (var-get price-BTC))),
            ;;  contract-price: 0, est-profit: 0}))

            (ok (map-set CA {year: (var-get year)}
                    {
                        payment: (* 
                                    (var-get rate-per-period) 
                                    (unwrap-panic (get balance (map-get? CA {year: (- (var-get year) 1)})))
                                ), 
                        balance: (+ 
                                    (unwrap-panic (get balance (map-get? CA {year: (- (var-get year) 1)}))) 
                                    (- (var-get bitcoin-to-contract) (var-get amortize-const))
                                ), 
                        anuity-withdrawal: (- 
                                                (var-get amortize-const) 
                                                (* 
                                                    (var-get rate-per-period) 
                                                    (unwrap-panic (get balance (map-get? CA {year: (- (var-get year) 1)})))
                                                )
                                            ), 
                        tx-fee: 0, 
                        btc-yield-nft: (- 
                                            (- 
                                                (var-get amortize-const) 
                                                (* 
                                                    (var-get rate-per-period) 
                                                    (unwrap-panic (get balance (map-get? CA {year: (- (var-get year) 1)})))
                                                )
                                            )
                                        0), 
                        nft-yield-usd: (* 
                                            (- 
                                                (- 
                                                    (var-get amortize-const) 
                                                    (* (var-get rate-per-period) (var-get bitcoin-to-contract))
                                                ) 
                                            0) 
                                            (+ 
                                                (* (var-get price-BTC) (/ 50 100)) (var-get price-BTC)
                                            )
                                        ), 
                        contract-appr: 0, 
                        nft-rev-opt-call: 0, 
                        opt-call-fee: 0, 
                        est-btc-price: (+ 
                                            (* 
                                                (unwrap-panic (get est-btc-price (map-get? CA {year: (- (var-get year) 1)})))
                                                (/ 50 100)
                                            ) 
                                            (unwrap-panic (get est-btc-price (map-get? CA {year: (- (var-get year) 1)})))
                                        )
                    } 
                )
            )

        )    
    )
)

;; Read-only functions

(define-read-only (get-amortize-rate)
    (var-get amortize-rate)
)

(define-read-only (get-amortize-constant)
    (var-get amortize-rate)
)

(define-read-only (get-rate-per-Period)
    (var-get rate-per-period)
)

(define-read-only (get-btc-to-contract)
    (var-get bitcoin-to-contract)
)

(define-read-only (get-minting-equity)
    (var-get equity-mint)
)