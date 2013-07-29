package com.nearly.demo.services.errorhandler;


import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.ReferenceCardinality;
import org.apache.felix.scr.annotations.ReferencePolicy;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.i18n.DefaultLocaleResolver;
import org.apache.sling.i18n.LocaleResolver;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Locale;


@SlingServlet(paths = ErrorHandlerServlet.PATH)
public class ErrorHandlerServlet extends SlingAllMethodsServlet {

	private static LocaleResolver DEFAULT_LOCALE_RESOLVER = new DefaultLocaleResolver();

	@Reference(cardinality = ReferenceCardinality.OPTIONAL_UNARY, policy = ReferencePolicy.DYNAMIC)
	private LocaleResolver localeResolver = DEFAULT_LOCALE_RESOLVER;

	public static final String PATH = "/services/nearly/demo/errorhandler";

	//TODO create config available via Felix console
	public static final String NEARLY_ROOT = "/content/nearly-demo";
	//TODO create config available via Felix console

	public static final String ERROR_PAGES_FOLDER_NAME = "errorpages";

	public static final String DEFAULT_LANG = "en";

	private static final long serialVersionUID = 1L;

	//private static final Logger log = LoggerFactory.getLogger(ErrorHandlerServlet.class.getName());

	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
		try {
			int statusCode = getStatusCode(request);
			try {
				response.setStatus(statusCode);
				String userAgent = request.getHeader("User-Agent");
				String httpAccept = request.getHeader("Accept");


				Resource errorPageResource = getErrorPageResource(request, statusCode, false);
				String errorPagePath = errorPageResource.getPath() + ".html";
				request.getRequestDispatcher(errorPagePath).include(request, response);
			} catch (Exception e) {
				//String errorMessage = (String) request.getAttribute("javax.servlet.error.message");
				//response.sendError(statusCode, errorMessage);
				//log.error("Error during constructing error page", e);
			}
		} catch (Exception e) {
			//log.error("Error during constructing error page", e);
			//response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

	protected int getStatusCode(SlingHttpServletRequest request) {
		Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
		statusCode = (statusCode != null) ? statusCode : HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
		return statusCode;
	}

	protected Resource getErrorPageResource(SlingHttpServletRequest request, Integer statusCode, boolean isMobile) {
		ResourceResolver resourceResolver = request.getResourceResolver();
		Resource errorPage = null;
		Enumeration locales = request.getLocales(); //assume we are calling getLocales method from I18NHttpServletRequest request wrapper (see I18NFilter)
		String siteRoot = NEARLY_ROOT;
		while (locales.hasMoreElements()) {
			Locale locale =  (Locale)locales.nextElement();
			String localizedPath = siteRoot + "/" + locale.toString() + "/" + ERROR_PAGES_FOLDER_NAME + "/" + statusCode.toString();
			errorPage = resourceResolver.getResource(localizedPath);

			//return first error page matching preferred locale
			if (errorPage != null) {
				return errorPage;
			}
		}

		//return error page based on default locale
		errorPage = resourceResolver.getResource(NEARLY_ROOT + "/" + DEFAULT_LANG + "/" + ERROR_PAGES_FOLDER_NAME + "/" + statusCode.toString());
		return errorPage;
	}
}
