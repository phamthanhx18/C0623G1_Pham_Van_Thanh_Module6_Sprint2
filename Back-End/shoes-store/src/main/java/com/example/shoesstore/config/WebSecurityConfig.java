package com.example.shoesstore.config;
import com.example.shoesstore.security.jwt.JwtAuthenticationFilter;
import com.example.shoesstore.service.auth.impl.MyUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * This class configures web security for the application.
 *
 * @author: ThanhPV
 * @date: 02/01/2024
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Autowired
    private MyUserDetailService myUserDetailService;

    /**
     * Creates an authentication manager.
     *
     * @param authConfig The authentication configuration.
     * @return The authentication manager.
     * @throws Exception If an error occurs while creating the authentication manager.
     * @author: ThanhPV
     * @date: 02/01/2024
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    /**
     * Creates a password encoder using BCrypt.
     *
     * @return The BCrypt password encoder.
     * @author: ThanhPV
     * @date: 02/01/2024
     * @return The BCrypt password encoder.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Creates a JWT authentication filter bean.
     *
     * @return The JWT authentication filter.
     * @author: ThanhPV
     * @date: 02/01/2024
     */
    @Bean
    public JwtAuthenticationFilter authenticationJwtTokenFilter() {
        return new JwtAuthenticationFilter();
    }

    /**
     * Creates an authentication provider for DAO.
     *
     * @return The DAO authentication provider.
     * @author: ThanhPV
     * @date: 02/01/2024
     * @return The DAO authentication provider.
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(myUserDetailService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * Configures security filters for HTTP requests.
     *
     * @param http The HTTP security configuration.
     * @return The built security filter chain.
     * @throws Exception If an error occurs while configuring the security filters.
     * @author: ThanhPV
     * @date: 02/01/2024
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests((requests) -> requests
//                        Trang không cần đăng nhập
                                .requestMatchers(
                                        "/api/login",
                                        "/api/category",
                                        "/api/size",
                                        "/api/color",
                                        "/api/product",
                                        "/api/order",
                                        "/api/product/all",
                                        "/api/product/{id}",
                                        "/api/product/filter",
                                        "/api/product/get-size/{idVariant}",
                                        "/api/product/get-price-filter",
                                        "/api/customer"
                                        ).permitAll()
                                .requestMatchers("/api/product/add").hasRole("MANAGER")
                                .requestMatchers("/api/product/{id}/add-variant").hasRole("MANAGER")
                                .requestMatchers("/api/category/all").hasRole("MANAGER")
                                .requestMatchers("/api/category/add").hasRole("MANAGER")
                                .requestMatchers("/api/category/{id}").hasRole("MANAGER")
                                .requestMatchers("/api/color/all").hasRole("MANAGER")
                                .requestMatchers("/api/color/add").hasRole("MANAGER")
                                .requestMatchers("/api/color/{id}").hasRole("MANAGER")
                                .requestMatchers("/api/size/all").hasRole("MANAGER")
                                .requestMatchers("/api/order/all**").hasRole("MANAGER")
                                .requestMatchers("/api/order/revenue").hasRole("MANAGER")
                                .requestMatchers("/api/user/**").hasRole("MANAGER")
                                .requestMatchers("/api/check-auth","/api/logout").authenticated()
                )
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class)
                .formLogin((form) -> form.disable())
                .logout((logout) -> logout.permitAll());
        
        return http.build();
    }
}
