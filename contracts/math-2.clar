;; <2nd part for math calculation>

;; constants


;; data maps and vars
(define-data-var avg-purchase-time int 0)

(define-data-var avg-contract-val int 0)

(define-data-var btc-appr int 0)

(define-data-var start-num-home int 0)

(define-data-var start-btc-price int 0)

(define-data-var tx-fee-btc int 0)

(define-data-var option-fee int 0)

(define-data-var pro-grow-year int 0)

(define-data-var avg-term int 0)

(define-data-var avg-opt-call int 0)

(define-data-var home-val int 0)

(define-data-var mor-balance int 0)

(define-data-var zip-code (string-ascii 10) "")

(define-data-var bed int 0)

(define-data-var bath int 0)

(define-data-var area int 0)

(define-data-var year int 0)

(define-data-var est-btc-price int 0)


(define-map pro-rev-call {year: int} 
    {
        homes: int, 
        btc-contract: int, 
        tx-rev-btc: int, 
        tx-rev-usd: int, 
        fut-val: int, 
        avg-btc-cont-pr: int
    }
)

;; private functions

;; public functions
(define-public (rev-cal)
    (begin

        (if (is-eq (var-get year) 1) ;; for first year

            (ok (map-set pro-rev-call {year: 1}
                    {
                        homes: (+ 
                                    (var-get start-num-home) 
                                    (* 
                                        (var-get start-num-home) 
                                        (var-get pro-grow-year)
                                    )
                                ), 

                        btc-contract: (/ 
                                        (* 
                                            (var-get avg-contract-val) 
                                            (+ 
                                                (var-get start-num-home) 
                                                (* 
                                                    (var-get start-num-home) 
                                                    (var-get pro-grow-year)
                                                )
                                            )
                                        ) 
                                        (/ 
                                            (+ 
                                                (var-get start-btc-price) 
                                                (var-get est-btc-price)
                                            ) 
                                        2)
                                    ),

                        tx-rev-btc: (* 
                                        (var-get tx-fee-btc) 
                                        (/ 
                                            (* 
                                                (var-get avg-contract-val) 
                                                (+ 
                                                    (var-get start-num-home) 
                                                    (* 
                                                        (var-get start-num-home) 
                                                        (var-get pro-grow-year)
                                                    )
                                                )
                                            ) 
                                            (/ 
                                            (+ 
                                                (var-get start-btc-price) 
                                                (var-get est-btc-price)
                                            ) 
                                            2)
                                        )
                                    ),

                        tx-rev-usd: (/ 
                                        (* 
                                            (var-get est-btc-price) 
                                            (* 
                                                (var-get tx-fee-btc) 
                                                (/ 
                                                    (* 
                                                        (var-get avg-contract-val) 
                                                        (+ 
                                                            (var-get start-num-home) 
                                                            (* 
                                                                (var-get start-num-home) 
                                                                (var-get pro-grow-year)
                                                            )
                                                        )
                                                    ) 
                                                    (/ 
                                                        (+ 
                                                            (var-get start-btc-price) 
                                                            (var-get est-btc-price)
                                                        ) 
                                                    2)
                                                )
                                            )
                                        ) 
                                    1000),

                        fut-val: (/ 
                                    (* 
                                        (* 
                                            (var-get tx-fee-btc) 
                                            (/ 
                                                (* 
                                                    (var-get avg-contract-val) 
                                                    (+ 
                                                        (var-get start-num-home) 
                                                        (* 
                                                            (var-get start-num-home) 
                                                            (var-get pro-grow-year)
                                                        )
                                                    )
                                                ) 
                                                (/ 
                                                    (+ 
                                                        (var-get start-btc-price) 
                                                        (var-get est-btc-price)
                                                    ) 
                                                2)
                                            )
                                        ) 
                                        (var-get est-btc-price)
                                    ) 
                                1000), 

                        avg-btc-cont-pr: (/
                                            (+ 
                                                (var-get start-btc-price) 
                                                (var-get est-btc-price)
                                            ) 
                                        2)
                    }
                )
            )
        
        

            (ok (map-set pro-rev-call {year: (var-get year)}
                {
                    homes: (+ 
                                (unwrap-panic 
                                    (get homes (map-get? pro-rev-call {year: (- (var-get year) 1)}))
                                ) 
                                (* 
                                    (unwrap-panic (get homes (map-get? pro-rev-call {year: (- (var-get year) 1)}))) 
                                    (var-get pro-grow-year)
                                )
                            ), 

                    btc-contract: (/ 
                                    (* 
                                        (var-get avg-contract-val) 
                                        (unwrap-panic (get homes (map-get? pro-rev-call {year: (var-get year)})))
                                    ) 
                                    (/ 
                                        (+ 
                                            (var-get start-btc-price) 
                                            (var-get est-btc-price)
                                        ) 
                                    2)
                                ),

                    tx-rev-btc: (* 
                                    (var-get tx-fee-btc) 
                                    (/ 
                                        (* 
                                            (var-get avg-contract-val) 
                                            (unwrap-panic (get homes (map-get? pro-rev-call {year: (var-get year)})))
                                        ) 
                                        (/ 
                                            (+ 
                                                (var-get start-btc-price) 
                                                (var-get est-btc-price)
                                            ) 
                                        2)
                                    )
                                ),

                    tx-rev-usd: (/ 
                                    (* 
                                        (* 
                                            (var-get tx-fee-btc) 
                                            (/ 
                                                (* 
                                                    (var-get avg-contract-val) 
                                                    (unwrap-panic (get homes (map-get? pro-rev-call {year: (var-get year)})))
                                                ) 
                                                (/ 
                                                    (+ 
                                                        (var-get start-btc-price) 
                                                        (var-get est-btc-price)
                                                    ) 
                                                2)
                                            )
                                        ) 
                                        (var-get est-btc-price)
                                    ) 
                                1000),

                    fut-val: (/ 
                                (* 
                                    (var-get est-btc-price) 
                                    (+ 
                                        (* 
                                            (var-get tx-fee-btc) 
                                            (/ 
                                                (* 
                                                    (var-get avg-contract-val) 
                                                    (unwrap-panic (get homes (map-get? pro-rev-call {year: (var-get year)})))
                                                ) 
                                                (/ 
                                                    (+ 
                                                        (var-get start-btc-price) 
                                                        (var-get est-btc-price)
                                                    ) 
                                                2)
                                            )
                                        ) 
                                        (* 
                                            (var-get tx-fee-btc) 
                                            (/ 
                                                (* 
                                                    (var-get avg-contract-val) 
                                                    (unwrap-panic (get homes (map-get? pro-rev-call {year: (- (var-get year) 1)})))
                                                ) 
                                                (/ 
                                                    (+ 
                                                        (var-get start-btc-price) 
                                                        (var-get est-btc-price)
                                                    ) 
                                                2)
                                            )
                                        )
                                    )
                                ) 
                            1000), 
                            
                    avg-btc-cont-pr: (/ 
                                        (+ 
                                            (var-get start-btc-price) 
                                            (var-get est-btc-price)
                                        ) 
                                    2)
                }
                )
            )

        )

    )
)
